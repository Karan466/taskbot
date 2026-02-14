from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from backend.app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    due_date = Column(DateTime, nullable=True)
    due_time = Column(String, nullable=True)   # ✅ ADD THIS
    completed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
