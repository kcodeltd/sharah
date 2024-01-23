'use strict'

function stripXmlWhitespace(xml) {
  return xml.replace(/>\s+/g, '>').replace(/<\s+/g, '<').trim()
}

function escapeXml(s) {
  if (typeof s === 'number') {
    return s
  } else if (s === undefined || typeof s !== 'string') {
    return undefined
  } else {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
  }
}

class XmlElement {
  constructor({ name, content = [], attrs = {} }) {
    this.name = name
    this.content = content
    this.attrs = attrs
  }

  create() {
    const attrsStr = Object.entries(this.attrs)
      .map(([k, v]) => ` ${k}="${escapeXml(v)}"`)
      .join('')
    if (this.content.length > 0) {
      const content = this.content
        .map(function (el) {
          if (typeof el.create === 'function') {
            return el.create()
          } else {
            return escapeXml(el)
          }
        })
        .join(' ')
      return stripXmlWhitespace(`<${this.name}${attrsStr}>${content}</${this.name}>`)
    }
    return stripXmlWhitespace(`<${this.name}${attrsStr}/>`)
  }
}

module.exports = { escapeXml, stripXmlWhitespace, XmlElement }
