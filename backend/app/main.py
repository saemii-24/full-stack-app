from fastapi import FastAPI
from .routers import todo, login

app = FastAPI()

app.include_router(todo.router)
app.include_router(login.router)
