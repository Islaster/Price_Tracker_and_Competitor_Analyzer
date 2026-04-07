
import requests
from typing import List
from app.models.product import Product
import re
from functools import lru_cache

FAKE_STORE_URL = "https://api.escuelajs.co/api/v1/products"

def is_valid_image_url(url: str) -> bool:
    # Must be a direct image link with a real extension
    parsed = re.match(r'https?://.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$', url, re.IGNORECASE)
    if not parsed:
        return False
    
    # Block known placeholder domains
    placeholder_domains = ["placehold.co", "placeimg.com", "pravatar.cc", "placeholder", "placehold"]
    if any(domain in url for domain in placeholder_domains):
        return False
    
def is_valid_product(item: dict) -> bool:
    title = item.get("title", "")
    description = item.get("description", "")
    images = item.get("images", [])
    
    if re.search(r'[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}', title):
        return False
    
    if len(description) < 30:
        return False
    
    placeholder_domains = ["placehold.co", "placeimg.com", "pravatar.cc", "placeholder"]
    if any(domain in img for img in images for domain in placeholder_domains):
        return False
    
    return True

def fetch_products() -> List[Product]:
    response = requests.get(FAKE_STORE_URL)
    response.raise_for_status()
    data = response.json()
    return [Product(**item) for item in data if is_valid_product(item)]


def fetch_product_by_id(product_id: int) -> Product:
    response = requests.get(f"{FAKE_STORE_URL}/{product_id}")
    response.raise_for_status()
    data = response.json()
    return Product(**data)  
