import xss from 'xss'

// more https://jsxss.com/en/index.html

const sanitize = (html: string) => {
  return xss(html, {
    whiteList: {
      a: ['href', 'title', 'target', 'rel'],
      b: [],
      i: [],
      em: [],
      strong: [],
      p: [],
      br: [],
      ul: [],
      ol: [],
      li: [],
      div: [],
      span: ['style'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
  })
}

export { sanitize }