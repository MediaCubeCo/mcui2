/**
 * Проверка: все учитываемые .vue есть в каталоге, сторис и aiDoc по правилам.
 * Запуск после: node scripts/build-ai-catalog.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const componentsRoot = path.join(root, 'src', 'components')
const catalogPath = path.join(root, 'dist', 'ai-catalog', 'index.json')

const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-catalog.config.json'), 'utf8'))

function matchesDenylist(relFromComponents) {
  return config.denylist?.some((entry) => {
    const re = new RegExp(entry.pattern)
    return re.test(relFromComponents)
  })
}

function componentId(relFromComponents) {
  return relFromComponents.replace(/\.vue$/i, '')
}

function fail(msg) {
  console.error(`verify-ai-catalog: ${msg}`)
  process.exit(1)
}

async function main() {
  if (!fs.existsSync(catalogPath)) {
    fail(`нет ${path.relative(root, catalogPath)} — сначала npm run build:ai-catalog`)
  }

  const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'))
  const catalogIds = new Set(catalog.components.map((c) => c.id))

  const pattern = path.join(componentsRoot, '**/*.vue').replace(/\\/g, '/')
  const allAbs = await glob(pattern, { absolute: true })

  const expectedIds = new Set()
  for (const abs of allAbs) {
    const rel = path.relative(componentsRoot, abs).replace(/\\/g, '/')
    if (matchesDenylist(rel)) continue
    expectedIds.add(componentId(rel))
  }

  for (const id of expectedIds) {
    if (!catalogIds.has(id)) fail(`в каталоге нет компонента: ${id}`)
  }
  for (const id of catalogIds) {
    if (!expectedIds.has(id)) fail(`в каталоге лишняя запись (нет .vue): ${id}`)
  }

  for (const c of catalog.components) {
    if (!c.storyFile) {
      fail(`нет Storybook-сторис для ${c.id} (ожидается *.stories.ts рядом с .vue)`)
    }
    const storyAbs = path.join(root, c.storyFile)
    if (!fs.existsSync(storyAbs)) {
      fail(`storyFile указан, но файл не найден: ${c.storyFile}`)
    }
  }

  const requireAiDoc = new Set(config.requireAiDoc || [])
  for (const id of requireAiDoc) {
    const c = catalog.components.find((x) => x.id === id)
    if (!c) fail(`requireAiDoc: компонент не найден в каталоге: ${id}`)
    if (!c.aiDoc || !c.aiDoc.trim()) {
      fail(`требуется непустой ${id}.ai.md (см. scripts/ai-catalog.config.json → requireAiDoc)`)
    }
  }

  console.log(`verify-ai-catalog: OK (${catalog.componentCount} компонентов)`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
