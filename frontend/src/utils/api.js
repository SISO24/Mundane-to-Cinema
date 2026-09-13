const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function generatePoster(task) {
  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task }),
  })

  if (!res.ok) {
    throw new Error('Failed to generate poster')
  }

  return res.json()
}
