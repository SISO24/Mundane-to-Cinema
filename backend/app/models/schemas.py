from pydantic import BaseModel
from typing import Literal

# "Blocked" is a pseudo-genre — not something the creative LLM ever picks,
# only returned directly by the moderation gate in routes/generate.py.
Genre = Literal["Drama", "Comedy", "Horror", "Romance", "Thriller", "Sports", "Blocked"]


class TaskInput(BaseModel):
    task: str


class PosterOutput(BaseModel):
    title: str
    tagline: str
    synopsis: str
    genre: Genre
    rating: float
    review_quote: str
    critic_name: str