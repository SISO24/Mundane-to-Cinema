import json
import random
import re
import httpx
from app.core.config import settings

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

# gpt-oss-safeguard-20b is OpenAI's purpose-built safety classifier, free tier
# on Groq. It reasons over a written policy rather than matching a keyword
# list, so it generalizes across slang, euphemisms, and leetspeak variants
# without us needing to hand-maintain a list of banned words.
MODERATION_MODEL = "openai/gpt-oss-safeguard-20b"

# ---------------------------------------------------------------------------
# LAYER 1: fast, unambiguous keyword pre-check.
#
# "sex on the beach" slipped through the LLM classifier because it's a real
# cocktail name and the policy explicitly said not to flag ambiguous/mild
# phrasing — the classifier wasn't wrong given that instruction, the instruction
# was too permissive for a public app. Rather than just re-tuning the prompt
# and hoping, this adds a cheap, deterministic first pass: if the input
# contains one of these unambiguous terms as a whole word, it's blocked
# immediately, no LLM call needed, no ambiguity to reason about. This alone
# catches "sex on the beach" since "sex" appears as a standalone word.
#
# This is intentionally a SHORT list of terms with essentially no innocent
# meaning — it is not trying to be exhaustive (that's what Layer 2 is for).
# Word-boundary matching means "sex" matches "unisex"? No — \b won't match
# inside "unisex" since there's no boundary between "i" and "sex". It DOES
# match "sex on the beach", "sex tape", etc.
# ---------------------------------------------------------------------------
EXACT_WORD_TERMS = [
    "sex", "porn", "nude", "nudity", "naked", "orgasm", "xxx", "nsfw",
    "fetish", "hentai", "blowjob", "handjob", "dildo", "vibrator", "horny",
    "threesome", "gangbang", "incest", "bestiality", "molest", "rape",
]
# These need only a LEADING word boundary, not a trailing one, since they're
# word stems with legitimate suffixes (masturbate/masturbating/masturbation,
# erotic/erotica/erotically, pornographic/pornography, pedophile/pedophilia).
PREFIX_TERMS = ["masturbat", "erotic", "pornograph", "pedophil"]

EXPLICIT_PATTERN = re.compile(
    r"\b(" + "|".join(re.escape(t) for t in EXACT_WORD_TERMS) + r")\b"
    r"|\b(" + "|".join(re.escape(t) for t in PREFIX_TERMS) + r")",
    re.IGNORECASE,
)


def _contains_explicit_term(task: str) -> bool:
    return bool(EXPLICIT_PATTERN.search(task))


# ---------------------------------------------------------------------------
# LAYER 2: LLM reasoning classifier for everything the keyword list can't
# catch — euphemisms, indirect phrasing, context-dependent innuendo.
# ---------------------------------------------------------------------------
MODERATION_POLICY = """You are a content classifier for a lighthearted, family-friendly
app that turns a short description of someone's day into a fictional movie poster.

Classify the user's input as a VIOLATION (1) if it contains, requests, describes, or is
clearly trying to produce content in these categories:
- Sexual or pornographic content of any kind, explicit or implied
- Sexual acts, sexual body parts described in a sexual context, sexual slang or innuendo
- Solicitation of sexual content or sexual roleplay
- Content sexualizing minors (always a violation, zero tolerance, regardless of framing)

Do NOT flag (0) ordinary mundane tasks, mild crude humor unrelated to sex (e.g. burping,
farting, being messy), or medical/anatomical terms used in a clearly non-sexual everyday
context (e.g. "went to the doctor for a checkup").

IMPORTANT: this app is public-facing and shown to a general audience. If an input is
genuinely ambiguous or could be read either innocently or sexually, and there is no clear
signal pointing to the innocent reading, err on the side of flagging it (1) rather than
letting it through. A false block is a minor inconvenience here; a false pass is not.

Respond with ONLY this JSON, nothing else:
{"violation": 0 or 1}

Content to classify: "{task}"
"""

BLOCKED_POSTERS = [
    {
        "title": "ACCESS DENIED",
        "tagline": "Some scripts don't make it past the writers' room.",
        "synopsis": "This pitch got flagged before it ever reached production. Security has been notified. So has your mother, probably.",
        "genre": "Blocked",
        "rating": 0.1,
        "review_quote": "A bold pitch. Rejected anyway, immediately, with prejudice.",
        "critic_name": "The Standards Office",
    },
    {
        "title": "NOT ON THIS NETWORK",
        "tagline": "Every platform has a line. Congratulations, you found it.",
        "synopsis": "A promising submission takes a hard left turn into content no network, streaming or otherwise, is contractually able to air.",
        "genre": "Blocked",
        "rating": 0.0,
        "review_quote": "Ambitious. Wildly, catastrophically inappropriate. Ambitious.",
        "critic_name": "The Compliance Weekly",
    },
]


def get_blocked_poster() -> dict:
    return random.choice(BLOCKED_POSTERS)


async def _call_moderation(task: str) -> dict:
    prompt = MODERATION_POLICY.format(task=task)
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.post(
            GROQ_URL,
            headers={
                "Authorization": f"Bearer {settings.LLM_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": MODERATION_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0,
                "response_format": {"type": "json_object"},
                "reasoning_format": "hidden",
                "reasoning_effort": "low",
            },
        )
        response.raise_for_status()
        data = response.json()
        content = data["choices"][0]["message"]["content"]
        return json.loads(content)


async def is_flagged(task: str) -> bool:
    """Returns True if the input should be blocked.

    Two layers:
    1. Fast keyword pre-check (EXPLICIT_TERMS) — catches unambiguous cases
       instantly, no API call, no ambiguity for a model to reason wrong about.
    2. LLM classifier — catches everything else (euphemisms, indirect phrasing).
       Fails OPEN on error (network issue, malformed response, etc.) — if this
       layer itself breaks, the request proceeds rather than blocking everyone.
       This is a deliberate tradeoff for a meme project; a production app
       handling real risk would fail CLOSED instead. Layer 1 still applies
       regardless, so the most obvious cases are covered even if Layer 2 is down.
    """
    if _contains_explicit_term(task):
        return True

    try:
        result = await _call_moderation(task)
        return int(result.get("violation", 0)) == 1
    except (httpx.HTTPStatusError, httpx.TimeoutException, ValueError, json.JSONDecodeError, KeyError):
        return False