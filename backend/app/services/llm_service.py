import json
import httpx
from app.core.config import settings

VALID_GENRES = {"Drama", "Comedy", "Horror", "Romance", "Thriller", "Sports"}

# PROMPT_TEMPLATE = """You turn a mundane, boring real-life task into an exaggerated,
# prestige-TV-style dramatic pitch. Respond with ONLY a single valid JSON object.
# No markdown, no code fences, no explanation, no text before or after the JSON.

# Task: "{task}"

# Return JSON with exactly these fields:
# {{
#   "title": "a dramatic 2-5 word show title",
#   "tagline": "one punchy cinematic tagline, under 12 words",
#   "synopsis": "2 sentences, treat the task like a prestige thriller/drama plot",
#   "genre": "exactly one of these strings: Drama, Comedy, Horror, Romance, Thriller, Sports",
#   "rating": "a number between 4.0 and 9.9",
#   "review_quote": "one fake, funny critic quote, under 15 words",
#   "critic_name": "a fake publication name, e.g. The Daily Screen"
# }}
# """
PROMPT_TEMPLATE = """You are the marketing team for a prestige streaming platform, the kind
that makes even a grocery run sound like it deserves 8 Emmy nominations. You turn a mundane,
boring real-life task into an absurdly over-the-top dramatic pitch — specific, vivid, a little
unhinged, never generic. Avoid flat phrasing like "a thrilling journey" or "nothing will ever
be the same" — those are the phrases a lazy writer reaches for first. Reach further than that.

Here are examples of the tone and specificity you're going for:

Task: "I couldn't find my keys for 20 minutes before work"
{{
  "title": "The Lost Hour",
  "tagline": "Somewhere in this apartment, a man's dignity is also missing.",
  "synopsis": "A mid-level employee's morning unravels into a full-scale excavation of couch cushions and coat pockets. By minute twelve, he's questioning not just where his keys are, but who he's become.",
  "genre": "Comedy",
  "rating": 6.8,
  "review_quote": "Turns a house key into a MacGuffin worthy of Hitchcock.",
  "critic_name": "Apartment Weekly"
}}

Task: "My wifi went down during an important video call"
{{
  "title": "Buffering",
  "tagline": "In the age of connection, one man stood completely alone.",
  "synopsis": "Twelve minutes before the biggest call of his career, the signal dies — and with it, every ounce of his composure. What follows is a raw, unflinching descent into router-blinking-light purgatory.",
  "genre": "Thriller",
  "rating": 7.9,
  "review_quote": "The most tension I've felt watching a spinning wheel.",
  "critic_name": "Bandwidth Digest"
}}

Now do the same for this task. Match that level of specific, vivid, slightly unhinged detail —
pull concrete images from the task itself rather than writing something generic that could apply
to any task. Respond with ONLY a single valid JSON object. No markdown, no code fences, no
explanation, no text before or after the JSON.

Task: "{task}"

Return JSON with exactly these fields:
{{
  "title": "a dramatic 2-5 word show title, specific to this exact task",
  "tagline": "one punchy cinematic tagline, under 12 words, pulling a concrete detail from the task",
  "synopsis": "2 sentences, vivid and specific, treat the task like a prestige thriller/drama plot",
  "genre": "exactly one of these strings: Drama, Comedy, Horror, Romance, Thriller, Sports",
  "rating": "a number between 4.0 and 9.9",
  "review_quote": "one fake, funny critic quote, under 15 words, specific and witty, not generic praise",
  "critic_name": "a fake publication name, e.g. The Daily Screen"
}}
"""

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL = "openai/gpt-oss-20b"  # free-tier model, see console.groq.com/docs/rate-limits

FALLBACK_POSTER = {
    "title": "An Ordinary Day",
    "tagline": "Not everything can be dramatic.",
    "synopsis": "Sometimes the story generator itself has an off day. Try again in a moment.",
    "genre": "Drama",
    "rating": 6.0,
    "review_quote": "A surprisingly honest failure.",
    "critic_name": "The Backend Times",
}


def _extract_json(content: str) -> dict:
    """Best-effort extraction in case the model wraps JSON in stray text/fences."""
    content = content.strip()
    if content.startswith("```"):
        content = content.strip("`")
        if content.lower().startswith("json"):
            content = content[4:]
    start = content.find("{")
    end = content.rfind("}")
    if start == -1 or end == -1:
        raise ValueError("No JSON object found in model output")
    return json.loads(content[start : end + 1])


def _validate_and_clean(data: dict) -> dict:
    genre = data.get("genre", "Drama")
    if genre not in VALID_GENRES:
        genre = "Drama"

    try:
        rating = float(data.get("rating", 7.0))
    except (TypeError, ValueError):
        rating = 7.0
    rating = round(max(4.0, min(9.9, rating)), 1)

    return {
        "title": str(data.get("title", "Untitled"))[:60],
        "tagline": str(data.get("tagline", ""))[:100],
        "synopsis": str(data.get("synopsis", ""))[:400],
        "genre": genre,
        "rating": rating,
        "review_quote": str(data.get("review_quote", ""))[:150],
        "critic_name": str(data.get("critic_name", "Anonymous Critic"))[:60],
    }


async def _call_groq(prompt: str) -> str:
    async with httpx.AsyncClient(timeout=20.0) as client:
        response = await client.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {settings.LLM_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 1.0,
                "response_format": {"type": "json_object"},
                # Required for gpt-oss models when using JSON mode — without this,
                # reasoning tokens can leak into `content` and break json.loads().
                "reasoning_format": "hidden",
                # This task is short creative copy, not multi-step reasoning —
                # "low" keeps latency and token usage down with no quality loss here.
                "reasoning_effort": "low",
            },
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]


async def generate_poster_copy(task: str) -> dict:
    """Calls Groq and returns validated poster fields. Never raises to the caller —
    falls back to a safe default poster on any failure so the API never 500s
    on a flaky/malformed LLM response."""
    prompt = PROMPT_TEMPLATE.format(task=task)

    for attempt in range(2):
        try:
            raw_content = await _call_groq(prompt)
            parsed = _extract_json(raw_content)
            return _validate_and_clean(parsed)
        except (httpx.HTTPStatusError, httpx.TimeoutException, ValueError, json.JSONDecodeError, KeyError):
            if attempt == 0:
                continue  # one retry — covers occasional malformed JSON on first try
    return FALLBACK_POSTER
