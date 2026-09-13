from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import generate

app = FastAPI(title="Mundane to Cinema API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.ALLOWED_ORIGIN],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

app.include_router(generate.router, prefix="/api")


@app.get("/health")
def health():
    return {"status": "ok"}
