from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import products
from app.api import stripe

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api")
app.include_router(stripe.router, prefix="/api")

