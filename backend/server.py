from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import bcrypt
from database import supabase

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



@app.post('/register')
def register_user(user: Credential):
    
    existing = supabase.table("users").select("id").eq("username", user.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username is already taken.")
    
    hashed_bytes = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    hashed_password = hashed_bytes.decode("utf-8")
    
    response = supabase.table("users").insert({
        "username": user.username,
        "password": hashed_password
    }).execute()

    return {
        "message": "Registration successful!",
        "user": {
            "id": response.data[0]["id"],
            "username": response.data[0]["username"]
        }
    }

@app.post('/login', status_code=201)
def login_user(user: Credential):
    return 
    