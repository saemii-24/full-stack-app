from pydantic import BaseModel

class TodoCreate(BaseModel):
    title: str
    description: str = None

class Todo(TodoCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True
