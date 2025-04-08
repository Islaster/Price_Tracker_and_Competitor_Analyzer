from fastapi import APIRouter
from typing import List
from app.models.product import Product
from app.services.product_service import fetch_products, fetch_product_by_id

router = APIRouter()

@router.get("/products", response_model=List[Product])
def get_products():
    return fetch_products()

@router.get("/products/{product_id}", response_model=Product)
def get_product(product_id: int):
    return fetch_product_by_id(product_id)