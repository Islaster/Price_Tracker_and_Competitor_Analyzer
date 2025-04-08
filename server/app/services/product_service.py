
import requests
from typing import List
from app.models.product import Product

FAKE_STORE_URL = "https://fakestoreapi.com/products"

def fetch_products() -> List[Product]:
    response = requests.get(FAKE_STORE_URL)
    response.raise_for_status()
    data = response.json()
    return [Product(**item) for item in data] 

def fetch_product_by_id(product_id: int) -> Product:
    response = requests.get(f"{FAKE_STORE_URL}/{product_id}")
    response.raise_for_status()
    data = response.json()
    return Product(**data)  
