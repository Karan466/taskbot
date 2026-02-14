from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.database import Base, engine
from backend.app.models.task import Task
from backend.app.api.tasks import router as task_router
from backend.app.api.chat import router as chat_router

app = FastAPI(title="Task Management Chatbot")

# ✅ CORS CONFIG (REQUIRED FOR FRONTEND)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend (HTML/JS)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create DB tables
Base.metadata.create_all(bind=engine)

# ✅ Register routers
app.include_router(task_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "TaskBot API running 🚀"}
