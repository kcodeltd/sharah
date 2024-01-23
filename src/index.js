import createBadge from './lib/badge-maker'

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/') {
      return new Response('<p>this domain is used to serve badges for <a href="https://sharah.io">sharah.io</a></p>', {
        headers: { 'content-type': 'text/html;charset=UTF-8' }
      })
    }

    const label = url.pathname.split('/')[1]
    const message = url.pathname.split('/')[2]

    if (label && message) {
      const svg = createBadge(label, message)
      return new Response(svg, { headers: { 'content-type': 'image/svg+xml;charset=utf-8' } })
    }

    return new Response('please use the correct syntax: https://i.sharah.io/<label>/<message>', { status: 406 })
  }
}
