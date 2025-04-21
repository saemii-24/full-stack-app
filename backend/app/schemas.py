from pydantic import BaseModel


# FE에서 주는 값
class TodoCreate(BaseModel):
    title: str
    description: str = None
    important: bool = False


# BE에서 만드는 값
class Todo(TodoCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True
