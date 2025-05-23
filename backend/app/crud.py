from sqlalchemy.orm import Session
from . import models, schemas


def create_todo(db: Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(
        title=todo.title,
        description=todo.description,
        completed=False,
        important=todo.important,
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


def get_todos(db: Session):
    return db.query(models.Todo).all()


def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def get_important_todos(db: Session, important: bool):
    return db.query(models.Todo).filter(models.Todo.important == important).all()


def update_todo(db: Session, todo_id: int, todo_data: schemas.TodoCreate):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db_todo.title = todo_data.title
        db_todo.description = todo_data.description
        db_todo.important = todo_data.important
        db.commit()
        db.refresh(db_todo)
    return db_todo


def delete_todo(db: Session, todo_id: int):
    db_todo = get_todo(db, todo_id)
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo


def patch_complete(db: Session, todo_id: int, completed: bool):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()

    if not todo:
        raise Exception("Todo not found")

    todo.completed = completed
    db.commit()
    db.refresh(todo)

    return todo


def get_or_create_user(db: Session, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.userId == user.userId).first()

    if db_user:
        return db_user
    else:
        new_user = models.User(userId=user.userId, password=user.password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
