from pydantic import BaseModel
from typing import List

class Category(BaseModel): 
    id: int
    name: str
    slug: str
    image: str
    creationAt: str
    updatedAt: str

class Product(BaseModel):
    id: int
    title: str
    price: float
    description: str
    category: Category
    images: List[str]
    creationAt: str
    updatedAt: str
