from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import get_db

router = APIRouter(prefix="/login", tags=["Login"])


@router.post("", response_model=schemas.User)
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_or_create_user(db=db, user=user)
    return {
        "id": str(db_user.id),
        "userId": db_user.userId,
    }
