# Backend (FastAPI)

Thin proxy that turns a mundane task description into structured poster copy
(title, tagline, synopsis, genre, rating, review) via a Groq LLM call.

Model used: `openai/gpt-oss-20b` (Groq free tier). This is a reasoning model,
so the request sets `reasoning_format: hidden` and `reasoning_effort: low` —
without these, reasoning tokens can leak into the JSON output and break parsing.

## Setup
```bash
python -m venv venv
source venv/bin/activate   # or venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env       # then fill in your LLM_API_KEY
uvicorn app.main:app --reload
```

## Endpoints
- `POST /api/generate` — body: `{ "task": "string" }` → returns structured poster JSON
- `GET /health` — health check

## Reliability
`app/services/llm_service.py` is defensive by design:
- Strips markdown code fences / stray text if the model doesn't return pure JSON
- Validates `genre` against the allowed set and clamps `rating` to 4.0–9.9
- Retries once automatically on malformed output
- Falls back to a safe default poster rather than ever raising a 500 to the visitor
- The `/api/generate` route itself only returns a 500 if `LLM_API_KEY` is missing —
  a deliberate, clearly-worded error so setup mistakes are obvious, not silent
