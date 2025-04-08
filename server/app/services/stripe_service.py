
import stripe
from fastapi import Request
from fastapi.responses import JSONResponse
from app.config import STRIPE_SECRET_KEY

stripe.api_key = STRIPE_SECRET_KEY

async def create_checkout_session(request: Request):
    data = await request.json()
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["items"],
            mode="payment",
            success_url="http://localhost:5173/",
            cancel_url="http://localhost:5173/cancel",
        )
        return JSONResponse({"url": session.url})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
