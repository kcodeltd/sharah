import { XmlElement } from './xml'

const createBadge = (label, message, labelColor = '#555', messageColor = '#0b0') => {
  label = decodeURIComponent(label).replace(/\%20/g, ' ').trim()
  message = decodeURIComponent(message).replace(/\%20/g, ' ').trim()

  const labelWidth = label.length <= 5 ? 55 : label.length * 10
  const messageWidth = message.length <= 5 ? 55 : message.length * 10
  const badgeWidth = labelWidth + messageWidth
  const badgeHeight = 20

  const svgAttr = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    width: badgeWidth,
    height: badgeHeight,
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

  const title = new XmlElement({ name: 'title', content: [`${label}:${message}`] })

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
    content: [new XmlElement({ name: 'rect', attrs: { width: badgeWidth, height: badgeHeight, rx: 3, fill: '#fff' } })],
    attrs: { id: 'r' }
  })

  const gEle = new XmlElement({
    name: 'g',
    content: [
      new XmlElement({ name: 'rect', attrs: { width: labelWidth, height: badgeHeight, fill: labelColor } }),
      new XmlElement({ name: 'rect', attrs: { x: labelWidth, width: messageWidth, height: badgeHeight, fill: messageColor } }),
      new XmlElement({ name: 'rect', attrs: { width: badgeWidth, height: badgeHeight, fill: 'url(#s)' } })
    ],
    attrs: { 'clip-path': 'url(#r)' }
  })

  const textGEle = new XmlElement({
    name: 'g',
    content: [
      new XmlElement({ name: 'text', content: [label], attrs: { x: labelWidth / 2, y: 14 } }),
      new XmlElement({ name: 'text', content: [message], attrs: { x: messageWidth / 2 + labelWidth, y: 14 } })
    ],
    attrs: textGAttr
  })

  svg.content = [title, LGEle, CPEle, gEle, textGEle]
  return svg.create()
}

export default createBadge
