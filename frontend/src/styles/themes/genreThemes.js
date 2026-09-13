// Single source of truth for how each genre LOOKS.
// The LLM only ever returns a genre string — it never touches design,
// which keeps output visually consistent no matter what the model says.
//
// bg        — base poster background
// blobA/B   — two soft "art" shapes layered behind the text (pure CSS, no images)
// accent    — genre tag / rating / divider color
// text      — title color (usually white, but horror gets an off-white for mood)

export const GENRE_THEMES = {
  Drama: {
    bg: '#1a0505',
    blobA: 'radial-gradient(circle, rgba(180,20,20,0.55), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(60,0,0,0.6), transparent 70%)',
    accent: '#e63946',
    text: '#f5f0f0',
  },
  Comedy: {
    bg: '#241a02',
    blobA: 'radial-gradient(circle, rgba(255,183,3,0.5), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(255,87,34,0.4), transparent 70%)',
    accent: '#ffb703',
    text: '#fff8ec',
  },
  Horror: {
    bg: '#040f06',
    blobA: 'radial-gradient(circle, rgba(57,255,20,0.28), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(0,40,10,0.7), transparent 70%)',
    accent: '#5cff6b',
    text: '#e8f5e9',
  },
  Romance: {
    bg: '#22041a',
    blobA: 'radial-gradient(circle, rgba(255,77,141,0.45), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(120,0,80,0.5), transparent 70%)',
    accent: '#ff8fb3',
    text: '#fff0f6',
  },
  Thriller: {
    bg: '#050512',
    blobA: 'radial-gradient(circle, rgba(90,110,255,0.55), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(30,20,80,0.75), transparent 70%)',
    accent: '#7c8dff',
    text: '#eef0ff',
  },
  Sports: {
    bg: '#02121c',
    blobA: 'radial-gradient(circle, rgba(0,194,255,0.4), transparent 70%)',
    blobB: 'radial-gradient(circle, rgba(0,60,90,0.6), transparent 70%)',
    accent: '#00c2ff',
    text: '#eafcff',
  },
}

// Fake streaming networks — purely parody names/wordmarks, not real logos,
// so there's no trademark risk. Randomized client-side per generation.
export const NETWORKS = [
  { name: 'FLIXMAX', font: "'Anton', sans-serif" },
  { name: 'PRIME REEL', font: "'Anton', sans-serif" },
  { name: 'HBOMAX-ISH', font: "'Anton', sans-serif" },
  { name: 'DISNEY+ADEQUATE', font: "'Anton', sans-serif" },
  { name: 'PEACOCK-ADJACENT', font: "'Anton', sans-serif" },
]

export function pickRandomNetwork() {
  return NETWORKS[Math.floor(Math.random() * NETWORKS.length)]
}

export function pickEpisodeTag() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = days[new Date().getDay()]
  const season = Math.floor(Math.random() * 4) + 1
  const episode = Math.floor(Math.random() * 12) + 1
  return `S${season} · E${episode} · ${today}`
}
