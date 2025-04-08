from fastapi import APIRouter, Request
from app.services.stripe_service import create_checkout_session

router = APIRouter()

@router.post("/create-checkout-session")
async def checkout(request: Request):
    return await create_checkout_session(request)
