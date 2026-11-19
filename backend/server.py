from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Credential(BaseModel):
    username: str
    password: str

users: list[Credential] = []

@app.get("/")
def read_root():
    return {"message": users}

@app.post('/register')
def register_user(user: Credential):
    users.append(user)
    
    return {"message": "Successfully registered!"}

@app.post('/login')
def login_user(user: Credential):
    for x in users:
        print(x)
    