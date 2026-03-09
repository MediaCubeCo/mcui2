import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ICONS_SRC = path.join(__dirname, 'src/assets/icons')
const ICONS_OUT = path.join(__dirname, 'src/components/icons')
const MOCKS_DIR = path.join(__dirname, 'src/mocks')

/**
 * Преобразует имя иконки в имя компонента (PascalCase с префиксом Icon).
 */
function iconNameToComponentName(name) {
  const parts = name.split(/[-_]+/).filter(Boolean)
  const pascal = parts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('')
  return `Icon${pascal}`
}

/**
 * Извлекает внутреннее содержимое SVG (между <svg...> и </svg>).
 */
function extractSvgInnerContent(svgContent) {
  const start = svgContent.indexOf('<svg')
  if (start === -1) return svgContent
  const openEnd = svgContent.indexOf('>', start) + 1
  const closeStart = svgContent.lastIndexOf('</svg>')
  if (closeStart <= openEnd) return svgContent
  return svgContent.slice(openEnd, closeStart).trim()
}

/**
 * Извлекает viewBox из корневого <svg>.
 */
function extractViewBox(svgContent) {
  const match = svgContent.match(/viewBox\s*=\s*["']([^"']*)["']/i)
  return match ? match[1].trim() : '0 0 24 24'
}

/**
 * Делает id и url(#id) уникальными для каждого экземпляра (для градиентов и т.п.).
 */
function makeIdsUnique(innerContent) {
  const idRegex = /id="([^"]*)"/g
  const urlRegex = /(fill|stroke|clip-path|mask|filter|marker-start|marker-mid|marker-end)="url\(#([^)]+)\)"/g
  const hasIds = idRegex.test(innerContent)
  idRegex.lastIndex = 0
  const hasUrls = urlRegex.test(innerContent)
  urlRegex.lastIndex = 0
  if (!hasIds && !hasUrls) return { content: innerContent, needsUid: false }

  let content = innerContent
    .replace(/id="([^"]*)"/g, (_, id) => `:id="uid + '-${id.replace(/'/g, "\\'")}'"`)
    .replace(
      /(fill|stroke|clip-path|mask|filter|marker-start|marker-mid|marker-end)="url\(#([^)]+)\)"/g,
      (_, attr, id) => `:${attr}="getUrl('${id.replace(/'/g, "\\'")}')"`
    )
  return { content, needsUid: true }
}

/**
 * Заменяет <style>...</style> на <component :is="'style'">...</component>,
 * чтобы парсер Vue SFC не воспринимал </style> как границу блока стилей.
 */
function sanitizeStyleTagsForVueSfc(content) {
  return content
    .replace(/<style([^>]*)>/g, '<component :is="\'style\'"$1>')
    .replace(/<\/style>/g, '</component>')
}

const MC_ICON_SHELL_PATH = '../elements/McIconShell/McIconShell.vue'

function indentContent(content, spaces) {
  const prefix = ' '.repeat(spaces)
  return content.split('\n').map((line) => prefix + line).join('\n')
}

function buildIconVue(iconName, innerContent, needsUid, viewBox) {
  const viewBoxEscaped = viewBox.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  const useIdImport = needsUid ? "import { useId } from 'vue'\n" : ''
  let script = `<script setup lang="ts">
import McIconShell from '${MC_ICON_SHELL_PATH}'
${useIdImport}import { mcSvgIconStandaloneProps } from '@/composables/useMcSvgIconProps'

const viewBox = '${viewBoxEscaped}'
const props = defineProps({ ...mcSvgIconStandaloneProps })
`
  if (needsUid) {
    script += `const uid = useId()
function getUrl(id: string) {
  return \`url(#\${uid}-\${id})\`
}
`
  }
  script += `</script>
`
  const contentBlock = indentContent(innerContent, 4)
  const template = `<template>
  <McIconShell :view-box="viewBox" v-bind="props">
${contentBlock}
  </McIconShell>
</template>
`
  return script + template
}

function main() {
  if (!fs.existsSync(ICONS_SRC)) {
    console.error('Icons source dir not found:', ICONS_SRC)
    process.exit(1)
  }

  if (!fs.existsSync(ICONS_OUT)) {
    fs.mkdirSync(ICONS_OUT, { recursive: true })
  }

  const files = fs.readdirSync(ICONS_SRC).filter((f) => path.extname(f) === '.svg')
  const iconsList = {}
  const registryEntries = []

  for (const file of files) {
    const iconName = path.basename(file, '.svg')
    const componentName = iconNameToComponentName(iconName)
    iconsList[iconName] = file

    const svgPath = path.join(ICONS_SRC, file)
    const svgContent = fs.readFileSync(svgPath, 'utf8')
    const viewBox = extractViewBox(svgContent)
    const rawInner = extractSvgInnerContent(svgContent)
    const { content: innerContent, needsUid } = makeIdsUnique(rawInner)
    const safeForSfc = sanitizeStyleTagsForVueSfc(innerContent)

    const vuePath = path.join(ICONS_OUT, `${componentName}.vue`)
    const vueContent = buildIconVue(iconName, safeForSfc, needsUid, viewBox)
    fs.writeFileSync(vuePath, vueContent, 'utf8')

    registryEntries.push({ iconName, componentName })
  }

  if (!fs.existsSync(MOCKS_DIR)) {
    fs.mkdirSync(MOCKS_DIR, { recursive: true })
  }
  fs.writeFileSync(
    path.join(MOCKS_DIR, 'icons.json'),
    JSON.stringify(iconsList, null, 0) + '\n',
    'utf8'
  )

  const registryImports = registryEntries
    .map(({ componentName }) => `import ${componentName} from './${componentName}.vue'`)
    .join('\n')
  const registryMap = registryEntries
    .map(({ iconName, componentName }) => `  '${iconName.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}': ${componentName}`)
    .join(',\n')

  const registryContent = `/**
 * Сгенерировано build-icons.js. Не редактировать вручную.
 */
${registryImports}
import type { Component } from 'vue'
import type { IconsListUnion } from '@/types/styles/Icons'

export const iconRegistry: Record<IconsListUnion, Component> = {
${registryMap}
}
`

  fs.writeFileSync(path.join(ICONS_OUT, 'registry.ts'), registryContent, 'utf8')

  const indexExports = registryEntries
    .map(({ componentName }) => `export { default as ${componentName} } from './${componentName}.vue'`)
    .join('\n')
  const indexContent = `/**
 * Сгенерировано build-icons.js. Не редактировать вручную.
 */
${indexExports}
export { iconRegistry } from './registry'
`
  fs.writeFileSync(path.join(ICONS_OUT, 'index.ts'), indexContent, 'utf8')

  console.log('\x1b[35m', `Icons: ${files.length} components → ${ICONS_OUT}`)
  console.log('\x1b[35m', `icons.json → ${path.join(MOCKS_DIR, 'icons.json')}`)
  console.log('\x1b[35m', `registry.ts, index.ts → ${ICONS_OUT}\n`)
}

main()
