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

class Signup_Data(BaseModel):
    username: str
    password: str

users = list[dict]

@app.get("/")
def read_root():
    return {"message": "Python FastAPI backend is running!"}

@app.post('/signup')
def register_user(user_data: Signup_Data):
    users.append(user_data)
    
    return ('message:' 'Successfully registered!')
    