from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/todos")
def get_todos():
    return [
        {"id": 1, "task": "FastAPI 공부하기"},
        {"id": 2, "task": "ToDo 앱 만들기"}
    ]
