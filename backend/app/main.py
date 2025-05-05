from fastapi import FastAPI
from . import models
from .database import engine
from .routers import todo, login, test

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(todo.router)
app.include_router(login.router)
app.include_router(test.router)
