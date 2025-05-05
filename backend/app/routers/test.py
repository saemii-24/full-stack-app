from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/test", tags=["Test"])


@router.get("")
async def get_test_error(message: str):
    if message == "not_found":
        raise HTTPException(status_code=404, detail="NOT_FOUND")
    elif message == "title_required":
        raise HTTPException(status_code=400, detail="TITLE_REQUIRED")
    elif message == "not_allowed":
        raise HTTPException(status_code=403, detail="NOT_ALLOWED")

    return {"status": "ok", "received": message}
