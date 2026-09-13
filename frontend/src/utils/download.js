import { toPng } from 'html-to-image'

export async function downloadPoster(ref, filename = 'mundane-to-cinema.png') {
  if (!ref.current) return
  const dataUrl = await toPng(ref.current, { pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
