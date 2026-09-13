from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.models.schemas import TaskInput, PosterOutput
from app.services.llm_service import generate_poster_copy
from app.services.moderation_service import is_flagged, get_blocked_poster
from app.core.config import settings

# Initialize limiter to track by IP address
limiter = Limiter(key_func=get_remote_address)

router = APIRouter()

@router.post("/generate", response_model=PosterOutput)
@limiter.limit("5/minute") # Allow 5 requests per minute per IP
async def generate_poster(request: Request, input: TaskInput):
    if not input.task.strip():
        raise HTTPException(status_code=400, detail="Task text cannot be empty")

    if not settings.LLM_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="LLM_API_KEY is not set. Add it to backend/.env (see .env.example).",
        )

    if await is_flagged(input.task):
        return PosterOutput(**get_blocked_poster())

    result = await generate_poster_copy(input.task)
    return PosterOutput(**result)