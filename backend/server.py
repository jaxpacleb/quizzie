from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import bcrypt
from database import supabase
from schema.model import Credential

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://10.87.213.247:5173", 'http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post('/register')
def register_user(user: Credential):
    
    existing = supabase.table("accounts").select("id").eq("username", user.username).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Username is already taken.")
    
    hashed_bytes = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    hashed_password = hashed_bytes.decode("utf-8")
    
    response = supabase.table("accounts").insert({
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

@app.post("/login", status_code=200)
def login_user(user: Credential):
    
    # 1. Hanapin ang user sa Supabase 'users' tab   le gamit ang username
    response = (
        supabase.table("accounts")
        .select("id, username, password")
        .eq("username", user.username)
        .execute()
    )
    

    # 2. Kung walang nahanap na record, mali ang username
    if not response.data:
        raise HTTPException(status_code=400, detail="Invalid username or password.")

    db_user = response.data[0]

    # 3. I-verify kung tugma ang tinype na password sa naka-hash na password sa DB
    is_valid_password = bcrypt.checkpw(
        user.password.encode("utf-8"),
        db_user["password"].encode("utf-8")
    )

    if not is_valid_password:
        raise HTTPException(status_code=401, detail="Invalid username or password.")

    # 4. Magbalik ng success response (HUWAG isama ang password!)
    return {
        "message": "Login successful!",
        "user": {
            "id": db_user["id"],
            "username": db_user["username"]
        }
    }
    