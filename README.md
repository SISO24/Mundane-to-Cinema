# Mundane to Cinema 🎬

Turn your boring everyday tasks into a dramatic Netflix-style poster.

## Stack
- **Frontend:** React + Vite, HTML/CSS poster rendering via `html-to-image` (no AI image generation — the "poster art" is pure CSS gradients + blur, so it's crisp, fast, and free)
- **Backend:** FastAPI (thin proxy to LLM, keeps your API key secret)
- **LLM:** Groq, model `openai/gpt-oss-20b` (free tier — verified against Groq's current rate-limits page: 30 req/min, 1K req/day, 200K tokens/day, plenty for a launch)
- **Hosting:** Vercel (frontend) + Render/Railway/Fly.io (backend)
- **DB:** None (fully stateless)

## What's built
- Full loop: task input → LLM generates title/tagline/synopsis/genre/rating/critic quote → renders as a poster → downloads as PNG
- 6 genre-driven color themes (Drama/Comedy/Horror/Romance/Thriller/Sports), each with its own palette and background art
- Randomized fake streaming network badge per poster
- Auto-generated season/episode/day tag
- Watermark on every poster (edit `frontend/src/utils/config.js` to set your handle)
- Film grain + vignette overlay for a cinematic feel
- Custom typography: Anton (display), Source Serif 4 (body/quotes), Inter (UI)
- **Error-proofed LLM layer:** handles markdown-fenced JSON, invalid/out-of-range fields, one automatic retry on malformed output, and a safe fallback poster so a flaky LLM response never crashes the app or shows the visitor a broken page
- Clear setup error if you forget to add your API key (rather than a silent failure)

## The only thing YOU need to do
1. Get a free Groq API key: https://console.groq.com/keys
2. Paste it into `backend/.env` (copy from `.env.example` first)
3. Set your handle in `frontend/src/utils/config.js`
4. Run it (see below) or deploy

## Local Dev
1. Backend: `cd backend && uvicorn app.main:app --reload`
2. Frontend: `cd frontend && npm run dev`

## Deploy
- Backend → Render/Railway (set `LLM_API_KEY` as env var)
- Frontend → Vercel (set `VITE_API_URL` to your deployed backend URL)

## A note on the model choice
Groq deprecates and replaces free-tier models periodically (see their [deprecations page](https://console.groq.com/docs/deprecations)). This project currently uses `openai/gpt-oss-20b`, confirmed live on Groq's free tier as of this build. If you get a "model not found" error in the future, check https://console.groq.com/docs/rate-limits for the current free-tier model list and swap the `MODEL` constant in `backend/app/services/llm_service.py`.
