import fs from 'fs'
import path from 'path'
import svgstore from 'svgstore'
import { optimize } from 'svgo'
import { SPRITE_IDS, SPRITE_FILES } from './src/consts/iconsSpriteIds.js'

// Пути относительно cwd (как в оригинальном скрипте: yarn build:icons запускается из корня)
const cwd = process.cwd()
const iconsFolder = path.resolve(cwd, 'src/assets/icons')
const outputFolder = path.resolve(cwd, 'src/assets')
const mocksFolder = path.resolve(cwd, 'src/mocks')

const FLAG_PREFIX = 'flag_'
const VIEWBOX_DEFAULT = '0 0 24 24'
const VIEWBOX_RE = /viewBox\s*=\s*["']([^"']+)["']/
const SVG_OPEN_TAG_RE = /<svg[\s\S]*?>/
const DEFS_BLOCK_RE = /<defs>([\s\S]*?)<\/defs>/
const ID_ATTR_RE = /id=["']([^"']+)["']/g

/** Стили для скрытия спрайта без display:none (чтобы url(#id) градиентов разрешались) */
const SPRITE_HIDDEN_STYLE =
  'visibility:hidden;position:absolute;width:0;height:0;overflow:hidden;pointer-events:none'

function applySpriteHiddenStyle(svgString) {
  return svgString.replace(/<svg([^>]*)>/, `<svg$1 style="${SPRITE_HIDDEN_STYLE}">`)
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// Округление чисел в SVG (path d, координаты). Меньше = меньше размер, возможна потеря точности на сложных иконках.
const SVGO_FLOAT_PRECISION = 2

const svgoConfig = {
  floatPrecision: SVGO_FLOAT_PRECISION,
  multipass: false,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          removeHiddenElems: false,
          removeUselessDefs: false,
          inlineStyles: false
        }
      }
    }
  ]
}

function hasGradient(content) {
  return /linearGradient|radialGradient|fill="url\(#|stroke="url\(#/.test(content)
}

function buildSprite(svgFiles, idPrefix, runSvgo = true) {
  const sprites = svgstore()
  for (const svgFile of svgFiles) {
    const filePath = path.join(iconsFolder, svgFile)
    if (!fs.existsSync(filePath)) {
      console.warn('\x1b[33m', `[create-svg-sprite] skip (not found): ${filePath}`)
      continue
    }
    const iconName = `${idPrefix}-${path.basename(svgFile, '.svg')}`
    const svgContent = fs.readFileSync(filePath, 'utf8')
    sprites.add(iconName, svgContent, { copyAttrs: true, renameDefs: true })
  }
  let content = sprites.toString()?.replace(/(\r\n|\n|\r)/gm, '') ?? ''
  if (runSvgo && content.length > 0 && content.includes('<symbol')) {
    const result = optimize(content, { ...svgoConfig, path: idPrefix })
    content = result.data
  }
  return content
}

function buildGradientSprite(svgFiles) {
  const rootDefs = []
  const symbols = []
  for (const svgFile of svgFiles) {
    const filePath = path.join(iconsFolder, svgFile)
    const content = fs.readFileSync(filePath, 'utf8')
    const viewBoxMatch = content.match(VIEWBOX_RE)
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : VIEWBOX_DEFAULT
    const closeIdx = content.indexOf('</svg>')
    if (closeIdx === -1) continue
    let inner = content.slice(0, closeIdx).replace(SVG_OPEN_TAG_RE, '').trim()
    const iconName = path.basename(svgFile, '.svg')
    const symbolId = `${SPRITE_IDS.GRADS}-${iconName}`

    const defsMatch = inner.match(DEFS_BLOCK_RE)
    let symbolInner = inner
    if (defsMatch) {
      const defsContent = defsMatch[1]
      const ids = []
      let m
      ID_ATTR_RE.lastIndex = 0
      while ((m = ID_ATTR_RE.exec(defsContent)) !== null) ids.push(m[1])
      const uniqueIds = [...new Set(ids)]
      const prefix = iconName + '_'
      for (const id of uniqueIds) {
        const prefixedId = prefix + id
        const urlRe = new RegExp(`url\\s*\\(\\s*#${escapeRegex(id)}\\s*\\)`, 'gi')
        symbolInner = symbolInner.replace(urlRe, `url(#${prefixedId})`)
      }
      let prefixedDefsContent = defsContent
      for (const id of uniqueIds) {
        const prefixedId = prefix + id
        prefixedDefsContent = prefixedDefsContent.replace(
          new RegExp(`id=["']${escapeRegex(id)}["']`, 'g'),
          `id="${prefixedId}"`
        )
      }
      rootDefs.push(prefixedDefsContent)
      symbolInner = symbolInner.replace(DEFS_BLOCK_RE, '').trim()
    }
    symbols.push(`<symbol id="${symbolId}" viewBox="${viewBox}">${symbolInner}</symbol>`)
  }
  const defsBlock = rootDefs.length ? `<defs>${rootDefs.join('')}</defs>` : ''
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg">${defsBlock}${symbols.join('')}</svg>`
  const result = optimize(svgContent, { ...svgoConfig, path: SPRITE_IDS.GRADS })
  return result.data
}

function writeIconsList(svgFiles, filename = 'icons.json') {
  const iconsList = {}
  svgFiles.forEach((file) => {
    const name = file.replace('.svg', '')
    iconsList[name] = file
  })
  if (!fs.existsSync(mocksFolder)) {
    fs.mkdirSync(mocksFolder, { recursive: true })
  }
  fs.writeFileSync(path.join(mocksFolder, filename), JSON.stringify(iconsList))
}

if (!fs.existsSync(iconsFolder)) {
  console.error('\x1b[31m', '[create-svg-sprite] icons folder not found:', iconsFolder)
  process.exit(1)
}

const files = fs.readdirSync(iconsFolder)
const svgFiles = files.filter((file) => path.extname(file) === '.svg')

// Фильтр 1: флаги (имя файла начинается с "flag_")
const flagFiles = svgFiles.filter((file) => path.basename(file, '.svg').startsWith(FLAG_PREFIX))
// Фильтр 2: иконки с градиентами (по содержимому файла)
const gradientFiles = svgFiles.filter((file) => {
  if (path.basename(file, '.svg').startsWith(FLAG_PREFIX)) return false
  const filePath = path.join(iconsFolder, file)
  return hasGradient(fs.readFileSync(filePath, 'utf8'))
})
// Остаток — в основной спрайт
const mainFiles = svgFiles.filter((file) => !flagFiles.includes(file) && !gradientFiles.includes(file))

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder, { recursive: true })
}

const mainSpriteFile = SPRITE_FILES[SPRITE_IDS.MAIN]
const flagsSpriteFile = SPRITE_FILES[SPRITE_IDS.FLAGS]
const gradsSpriteFile = SPRITE_FILES[SPRITE_IDS.GRADS]

// Основной спрайт (остаток после фильтров)
const mainContent = applySpriteHiddenStyle(buildSprite(mainFiles, SPRITE_IDS.MAIN))
fs.writeFileSync(path.join(outputFolder, mainSpriteFile), mainContent)
console.log('\x1b[35m', '\nSPRITE SUCCESSFULLY CREATED:', path.join(outputFolder, mainSpriteFile), `(${mainFiles.length} icons)`)

// Спрайт флагов
if (flagFiles.length === 0) {
  console.warn('\x1b[33m', `[create-svg-sprite] no flag files found, skipping ${flagsSpriteFile}`)
} else {
  const flagsContent = applySpriteHiddenStyle(buildSprite(flagFiles, SPRITE_IDS.FLAGS))
  if (!flagsContent || !flagsContent.includes('<symbol')) {
    console.error('\x1b[31m', '[create-svg-sprite] flags sprite is empty or invalid (no symbols)')
    process.exit(1)
  }
  fs.writeFileSync(path.join(outputFolder, flagsSpriteFile), flagsContent)
  console.log('\x1b[35m', '\nSPRITE SUCCESSFULLY CREATED:', path.join(outputFolder, flagsSpriteFile), `(${flagFiles.length} flags)`)
}

// Спрайт градиентных иконок (ручная сборка, defs внутри symbol)
if (gradientFiles.length > 0) {
  const gradsContent = applySpriteHiddenStyle(buildGradientSprite(gradientFiles))
  fs.writeFileSync(path.join(outputFolder, gradsSpriteFile), gradsContent)
  console.log('\x1b[35m', '\nSPRITE SUCCESSFULLY CREATED:', path.join(outputFolder, gradsSpriteFile), `(${gradientFiles.length} gradient icons)`)
}

// Списки иконок: все, флаги, градиентные
writeIconsList(svgFiles)
writeIconsList(flagFiles, 'icons_flags.json')
writeIconsList(gradientFiles, 'icons_grad.json')
console.log(
  '\x1b[35m',
  '\nICONS LISTS SUCCESSFULLY CREATED:',
  path.join(mocksFolder, 'icons.json'),
  path.join(mocksFolder, 'icons_flags.json'),
  path.join(mocksFolder, 'icons_grad.json'),
  '\n'
)
