import svg from './lib/badge-maker'

export default {
  async fetch(request, env, ctx) {
    return new Response(svg, {
      headers: {
        'content-type': 'image/svg+xml;charset=utf-8'
      }
    })
  }
}
