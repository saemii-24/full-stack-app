from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db
from typing import List

router = APIRouter(prefix="/todos", tags=["Todos"])

# 해당 파일의 모든 API 경로는 /todos로 시작한다.
# Swagger 문서에 아래 API들이 전부 Todos 그룹 아래에 묶이게 된다.


@router.post("", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)


@router.get("", response_model=List[schemas.Todo])
def read_todos(db: Session = Depends(get_db)):
    return crud.get_todos(db)


@router.get("/important", response_model=List[schemas.Todo])
def read_important_only(db: Session = Depends(get_db)):
    return crud.get_important_todos(db, True)


@router.put("/{todo_id}", response_model=schemas.Todo)
def update_todo(
    todo_id: int, todo_data: schemas.TodoCreate, db: Session = Depends(get_db)
):
    return crud.update_todo(db=db, todo_id=todo_id, todo_data=todo_data)


@router.patch("/completed/{todo_id}", status_code=200)
def patch_complete(todo_id: int, request: schemas.TodoUpdateCompleted, db: Session = Depends(get_db)):
    return crud.patch_complete(db, todo_id, request.completed)


@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    crud.delete_todo(db=db, todo_id=todo_id)
    return None
