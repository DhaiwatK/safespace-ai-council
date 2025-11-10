"""
Authentication routes (demo only - hardcoded users)
"""
from fastapi import APIRouter, HTTPException
from app.models.schemas import LoginRequest, LoginResponse, User
from app.data.mock_data import MOCK_USERS
import secrets

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Demo login - returns hardcoded user based on role selection
    """

    # Map role to demo user
    role_to_user = {
        "complainant": MOCK_USERS["complainant_1"],
        "respondent": MOCK_USERS["respondent_1"],
        "investigator": MOCK_USERS["investigator_1"],
        "administrator": MOCK_USERS["administrator_1"]
    }

    user_data = role_to_user.get(request.role)

    if not user_data:
        raise HTTPException(status_code=400, detail="Invalid role")

    # Create user object
    user = User(**user_data)

    # Generate dummy token
    token = f"demo_token_{request.role}_{secrets.token_hex(8)}"

    return LoginResponse(user=user, token=token)


@router.get("/user", response_model=User)
async def get_current_user():
    """
    Get current user (demo - returns investigator by default)
    """
    return User(**MOCK_USERS["investigator_1"])
