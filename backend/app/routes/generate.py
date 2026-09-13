# import sys
# print(sys.executable)
from fastapi import APIRouter, HTTPException
from app.models.schemas import TaskInput, PosterOutput
from app.services.llm_service import generate_poster_copy
from app.services.moderation_service import is_flagged, get_blocked_poster
from app.core.config import settings

router = APIRouter()


@router.post("/generate", response_model=PosterOutput)
async def generate_poster(input: TaskInput):
    if not input.task.strip():
        raise HTTPException(status_code=400, detail="Task text cannot be empty")

    if not settings.LLM_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="LLM_API_KEY is not set. Add it to backend/.env (see .env.example).",
        )

    # Moderation gate runs BEFORE the creative model. If flagged, we return a
    # fixed joke poster immediately — no creative-model call at all, so it's
    # both faster and guarantees no explicit content ever reaches the creative
    # prompt or the response.
    if await is_flagged(input.task):
        return PosterOutput(**get_blocked_poster())

    # generate_poster_copy already retries once and falls back to a safe
    # default poster on failure — it will not raise here under normal conditions.
    result = await generate_poster_copy(input.task)
    return PosterOutput(**result)