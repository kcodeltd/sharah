import createBadge from '../lib/badge-maker'

export default function languageProcessor(url) {
  const label = url.pathname.split('/')[2]
  const message = url.pathname.split('/')[3]

  if (label && message) {
    const svg = createBadge(message, label, '#0b0', '#555')
    return new Response(svg, { headers: { 'content-type': 'image/svg+xml;charset=utf-8' } })
  }
}
