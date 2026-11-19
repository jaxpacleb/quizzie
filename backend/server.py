from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
    
    response = (
                supabase
                .table('accounts')
                .insert({'username': user.username, 'password': user.password})
                .execute()
                )
    
    if user.username.strip() == '' or user.password.strip() == '':
        raise HTTPException(
                    status_code=400,
                    detail='Some of your field is EMPTY!'
                )
    
    if not response.data: 
        raise HTTPException(
            status_code=401,
            detail='Registration unsuccessful!'
        )
    
    return {"message": "Successfully registered!"}

@app.post('/login', status_code=201)
def login_user(user: Credential):
    return 
    