from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, crud
from .database import engine, SessionLocal
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/todos", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)


@app.get("/todos", response_model=List[schemas.Todo])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_todos(db)


@app.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(
    todo_id: int, todo_data: schemas.TodoCreate, db: Session = Depends(get_db)
):
    return crud.update_todo(db=db, todo_id=todo_id, todo_data=todo_data)


@app.delete("/todos/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    crud.delete_todo(db=db, todo_id=todo_id)
    return None
