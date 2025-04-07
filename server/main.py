from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Allow CORS for your frontend (adjust as needed for production)
origins = [
    "http://localhost:5173",  # Vite default port
    "http://localhost:3000",  # optional: for fallback
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],              # or specify: ["GET", "POST"]
    allow_headers=["*"],              # or specify allowed headers
)

FAKE_STORE_URL = "https://fakestoreapi.com/products"

@app.get("/api/products")
def get_products():
    response = requests.get(FAKE_STORE_URL)
    return response.json()
@app.get("/api/products/{product_id}")
def get_product(product_id: int):
    response = requests.get(f"https://fakestoreapi.com/products/{product_id}")
    return response.json()

