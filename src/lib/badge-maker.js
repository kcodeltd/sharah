import { XmlElement } from './xml'

const svgAttr = {
  xmlns: 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  width: '130',
  height: '20',
  role: 'img'
}

const LGAttr = {
  id: 's',
  x2: '0',
  y2: '100%'
}

const textGAttr = {
  fill: '#fff',
  'text-anchor': 'middle',
  'font-family': 'Verdana,Geneva,DejaVu Sans,sans-serif',
  'font-size': '13'
}

const svg = new XmlElement({ name: 'svg', attrs: svgAttr })

const title = new XmlElement({ name: 'title', content: ['Status: Working'] })

const LGEle = new XmlElement({
  name: 'LinearGradient',
  content: [
    new XmlElement({ name: 'stop', attrs: { offset: 0, 'stop-color': '#aaa', 'stop-opacity': 0.1 } }),
    new XmlElement({ name: 'stop', attrs: { offset: 1, 'stop-opacity': 0.15 } })
  ],
  attrs: LGAttr
})

const CPEle = new XmlElement({
  name: 'clipPath',
  content: [new XmlElement({ name: 'rect', attrs: { width: 130, height: 20, rx: 3, fill: '#fff' } })],
  attrs: { id: 'r' }
})

const gEle = new XmlElement({
  name: 'g',
  content: [
    new XmlElement({ name: 'rect', attrs: { width: 60, height: 20, fill: '#555' } }),
    new XmlElement({ name: 'rect', attrs: { x: 60, width: 70, height: 20, fill: '#44cc11' } }),
    new XmlElement({ name: 'rect', attrs: { width: 130, height: 20, fill: 'url(#s)' } })
  ],
  attrs: { 'clip-path': 'url(#r)' }
})

const textGEle = new XmlElement({
  name: 'g',
  content: [
    new XmlElement({ name: 'text', content: ['Status'], attrs: { x: 30, y: 14 } }),
    new XmlElement({ name: 'text', content: ['Working'], attrs: { x: 95, y: 14 } })
  ],
  attrs: textGAttr
})

svg.content = [title, LGEle, CPEle, gEle, textGEle]

export default svg.create()
