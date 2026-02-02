import xss from 'xss'

// more https://jsxss.com/en/index.html

const whiteList = {
  a: ['href', 'title', 'target', 'rel', 'data-*'],
  b: [],
  i: [],
  em: [],
  strong: [],
  p: [],
  br: [],
  ul: [],
  ol: [],
  li: [],
  div: ['data-*'],
  span: ['style'],
  img: ['src', 'alt', 'title', 'width', 'height'],
}

const sanitize = (html: string) => {
  return xss(html, {
    whiteList,
    allowList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
    onIgnoreTagAttr(tag, name, value, isWhiteAttr) {
      //@ts-ignore
      if (whiteList[tag] && whiteList[tag].includes('data-*') && name && name.startsWith('data-')) {
        //@ts-ignore
        return `${name}="${xss.escapeAttrValue(value)}"`
      }
    }
  })
}

export { sanitize }