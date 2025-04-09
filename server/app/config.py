import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env at project root

STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://price-tracker-and-competitor-analyzer.vercel.app/")  # with fallback
