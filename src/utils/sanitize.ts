/**
 * xss — CJS: в браузере нет ESM default / именованных экспортов на lib/index.js.
 * https://jsxss.com/en/index.html
 */
import * as xssPkg from 'xss'

type FilterXSS = (html: string, options?: Record<string, unknown>) => string

const mod = xssPkg as Record<string, unknown>

const filterXSS: FilterXSS = (() => {
  if (typeof mod.default === 'function') return mod.default as FilterXSS
  if (typeof mod.filterXSS === 'function') return mod.filterXSS as FilterXSS
  throw new Error('xss: could not resolve filter (default/filterXSS)')
})()

const escapeAttrValue: (v: string) => string = (() => {
  const onFn = (filterXSS as { escapeAttrValue?: (v: string) => string }).escapeAttrValue
  if (typeof onFn === 'function') return onFn
  const top = mod.escapeAttrValue
  if (typeof top === 'function') return top as (v: string) => string
  throw new Error('xss: escapeAttrValue not found')
})()

const commonAttrs = ['class', 'id', 'style', 'title']

const whiteList: Record<string, string[]> = {
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
  return filterXSS(html, {
    whiteList,
    allowList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script'],
    // @ts-ignore
    onIgnoreTagAttr(tag, name, value) {
      if (whiteList[tag]?.includes('data-*') && name?.startsWith('data-')) {
        return `${name}="${escapeAttrValue(value)}"`
      }
    },
  })
}

export { sanitize }
