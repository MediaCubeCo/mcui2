import xss from 'xss'

// more https://jsxss.com/en/index.html

const commonAttrs = ['class', 'id', 'style', 'title']

const whiteList = {
  a: [...commonAttrs, 'href', 'title', 'target', 'rel', 'data-*'],
  b: [...commonAttrs],
  i: [...commonAttrs],
  s: [...commonAttrs],
  em: [...commonAttrs],
  strong: [...commonAttrs],
  p: [...commonAttrs],
  br: [...commonAttrs],
  ul: [...commonAttrs],
  ol: [...commonAttrs],
  li: [...commonAttrs],
  div: [...commonAttrs, 'data-*'],
  span: [...commonAttrs],
  img: [...commonAttrs, 'src', 'alt', 'title', 'width', 'height'],
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