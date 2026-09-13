import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "groq")
    ALLOWED_ORIGIN: str = os.getenv("ALLOWED_ORIGIN", "http://localhost:5173")


settings = Settings()
