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


class UserCreate(BaseModel):
    userId: str
    password: str


class User(BaseModel):
    id: int
    userId: str

    class Config:
        orm_mode = True
