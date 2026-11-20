from pydantic import BaseModel, field_validator

class Credential(BaseModel):
    username: str
    password: str

    @field_validator("username")
    @classmethod
    def validate_username(cls, v: str) -> str:
        if len(v) < 6 or len(v) > 12:
            raise ValueError("Username must be between 6 and 12 characters.")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8 or len(v) > 16:
            raise ValueError("Password must be between 8 and 16 characters.")
        return v