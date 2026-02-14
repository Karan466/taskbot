from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.app.database import SessionLocal
from backend.app.models.task import Task
from backend.app.services.nlp import detect_intent
from backend.app.utils.date_parser import parse_human_date
from backend.app.utils.time_parser import parse_time

router = APIRouter(prefix="/chat", tags=["Chatbot"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/")
def chat(message: str, db: Session = Depends(get_db)):
    msg = message.lower().strip()
    intent = detect_intent(msg)

    # ➕ ADD TASK
    if intent == "add":
        due_date = parse_human_date(msg)
        due_time = parse_time(msg)

        title = msg.replace("add", "")
        for word in ["today", "tomorrow", "next week", "at"]:
            title = title.replace(word, "")
        if due_time:
            title = title.replace(due_time, "")

        title = title.strip()

        if not title:
            return {"reply": "❌ Please provide a task name"}

        task = Task(
            title=title,
            due_date=due_date,
            due_time=due_time
        )

        db.add(task)
        db.commit()
        db.refresh(task)

        reply = f"✅ Task \"{task.title}\" added"
        if "today" in msg:
            reply += " for today"
        elif "tomorrow" in msg:
            reply += " for tomorrow"
        elif "next week" in msg:
            reply += " for next week"

        if due_time:
            reply += f" at {due_time}"

        return {"reply": reply}

    # 📋 LIST TASKS
    if intent == "list":
        tasks = db.query(Task).all()

        if not tasks:
            return {"reply": "📭 No tasks found"}

        reply = "📋 Your tasks:\n"
        for t in tasks:
            status = "✅" if t.completed else "⏳"
            time_part = f" at {t.due_time}" if t.due_time else ""
            reply += f"{t.id}. {t.title}{time_part} {status}\n"

        return {"reply": reply}

    # ✅ COMPLETE TASK
    if intent == "complete":
        words = msg.split()

        try:
            task_id = int(words[-1])
        except ValueError:
            return {"reply": "❌ Please specify a valid task number"}

        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return {"reply": "❌ Task not found"}

        task.completed = True
        db.commit()

        return {"reply": f"🎉 Task \"{task.title}\" marked as completed"}

    # ❌ DELETE TASK
    if intent == "delete":
        words = msg.split()

        try:
            task_id = int(words[-1])
        except ValueError:
            return {"reply": "❌ Please specify a valid task number"}

        task = db.query(Task).filter(Task.id == task_id).first()
        if not task:
            return {"reply": "❌ Task not found"}

        db.delete(task)
        db.commit()

        return {"reply": f"🗑️ Task \"{task.title}\" deleted"}

    # 🤖 FALLBACK
    return {
        "reply": (
            "🤖 I didn’t understand that.\n"
            "Try:\n"
            "• add buy milk tomorrow at 6 pm\n"
            "• my tasks\n"
            "• complete task 1\n"
            "• delete task 1"
        )
    }
