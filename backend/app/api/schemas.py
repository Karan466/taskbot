from pydantic import BaseModel
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    due_date: Optional[str] = None
    due_time: Optional[str] = None
