from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.task import Task
from datetime import datetime

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/add")
def add_task(title: str, due_date: str = None, db: Session = Depends(get_db)):
    parsed_date = None

    if due_date:
        due_date = due_date.strip()  # ✅ IMPORTANT FIX
        try:
            parsed_date = datetime.fromisoformat(due_date)
        except ValueError:
            raise HTTPException(
                status_code=400,
                detail="Invalid date format. Use YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS"
            )

    task = Task(
        title=title,
        due_date=parsed_date
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return {
        "message": "Task added successfully",
        "task_id": task.id,
        "due_date": parsed_date
    }
