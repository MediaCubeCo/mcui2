#!/usr/bin/env node
/**
 * MCP-сервер для каталога mediacube-ui-v2 (stdio).
 * Загрузка каталога: MEDIACUBE_UI_CATALOG_PATH | MEDIACUBE_UI_CATALOG_URL | require.resolve('mediacube-ui-v2/ai-catalog.json') | dist/ai-catalog/index.json в репо.
 * Типы и FOR_AI.md: рядом с index.json или MEDIACUBE_UI_TYPES_ROOT (корневая папка dist/ai-catalog).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import * as z from 'zod/v4'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

/** @type {string | null} */
let catalogRootDir = null

async function loadCatalogJson() {
  if (process.env.MEDIACUBE_UI_CATALOG_PATH) {
    const p = path.resolve(process.env.MEDIACUBE_UI_CATALOG_PATH)
    catalogRootDir = path.dirname(p)
    return JSON.parse(fs.readFileSync(p, 'utf8'))
  }
  if (process.env.MEDIACUBE_UI_CATALOG_URL) {
    const res = await fetch(process.env.MEDIACUBE_UI_CATALOG_URL)
    if (!res.ok) throw new Error(`HTTP ${res.status} ${process.env.MEDIACUBE_UI_CATALOG_URL}`)
    catalogRootDir = null
    return res.json()
  }
  try {
    const require = createRequire(path.join(process.cwd(), 'package.json'))
    const resolved = require.resolve('mediacube-ui-v2/ai-catalog.json')
    catalogRootDir = path.dirname(resolved)
    return JSON.parse(fs.readFileSync(resolved, 'utf8'))
  } catch {
    /* ignore */
  }
  const local = path.join(root, 'dist', 'ai-catalog', 'index.json')
  if (fs.existsSync(local)) {
    catalogRootDir = path.dirname(local)
    return JSON.parse(fs.readFileSync(local, 'utf8'))
  }
  throw new Error(
    'Каталог не найден. Установите mediacube-ui-v2, задайте MEDIACUBE_UI_CATALOG_PATH/URL или npm run build:ai-catalog.'
  )
}

function getArtifactRoot() {
  if (process.env.MEDIACUBE_UI_TYPES_ROOT) return path.resolve(process.env.MEDIACUBE_UI_TYPES_ROOT)
  return catalogRootDir
}

function getComponentById(catalog, id) {
  return catalog?.components?.find((c) => c.id === id || c.name === id)
}

function searchComponents(catalog, query, category) {
  const q = (query || '').toLowerCase().trim()
  let list = catalog.components
  if (category) list = list.filter((c) => c.category === category)
  if (!q) return list
  return list.filter(
    (c) => c.searchText.includes(q) || c.id.includes(q) || c.name.toLowerCase().includes(q)
  )
}

function findTypeEntry(catalog, key) {
  const idx = catalog.typesIndex || []
  const k = key.trim()
  for (const e of idx) {
    if (e.id === k || e.packageExport === k || e.file === k) return e
  }
  const tail = k.split('/').filter(Boolean)
  const last = tail[tail.length - 1]
  if (last) {
    const noExt = last.replace(/\.ts$/i, '')
    for (const e of idx) {
      if (e.id === `types/${noExt}` || e.id === `enums/${noExt}`) return e
      if (e.id.endsWith(`/${noExt}`)) return e
    }
  }
  return null
}

function tryReadFileViaPackage(subpathFromArtifactRoot) {
  try {
    const require = createRequire(path.join(process.cwd(), 'package.json'))
    const specifier = `mediacube-ui-v2/ai-catalog/${subpathFromArtifactRoot.replace(/^\//, '')}`
    const resolved = require.resolve(specifier)
    return fs.readFileSync(resolved, 'utf8')
  } catch {
    return null
  }
}

function readTypeSource(catalog, key, maxChars) {
  const entry = findTypeEntry(catalog, key)
  if (!entry) {
    return { error: 'type not found', key, packageExportHint: null, text: null, truncated: false }
  }
  const base = getArtifactRoot()
  let text = null
  if (base) {
    const abs = path.join(base, entry.file)
    if (fs.existsSync(abs)) text = fs.readFileSync(abs, 'utf8')
  }
  if (text == null) text = tryReadFileViaPackage(entry.file)
  if (text == null) {
    return {
      error: 'type file not on disk (set MEDIACUBE_UI_TYPES_ROOT or use local build)',
      key,
      packageExport: entry.packageExport,
      file: entry.file,
      text: null,
      truncated: false
    }
  }
  const truncated = text.length > maxChars
  return {
    error: null,
    id: entry.id,
    packageExport: entry.packageExport,
    file: entry.file,
    text: truncated ? text.slice(0, maxChars) : text,
    truncated
  }
}

function readAiGuide(maxChars) {
  const base = getArtifactRoot()
  let text = null
  if (base) {
    const abs = path.join(base, 'FOR_AI.md')
    if (fs.existsSync(abs)) text = fs.readFileSync(abs, 'utf8')
  }
  if (text == null) text = tryReadFileViaPackage('FOR_AI.md')
  if (text == null) {
    return {
      error: 'FOR_AI.md not found (build ai-catalog or set MEDIACUBE_UI_TYPES_ROOT)',
      text: null,
      truncated: false
    }
  }
  const truncated = text.length > maxChars
  return {
    error: null,
    text: truncated ? text.slice(0, maxChars) : text,
    truncated
  }
}

async function main() {
  const catalog = await loadCatalogJson()

  const mcp = new McpServer({
    name: 'mediacube-ui',
    version: String(catalog.libraryVersion || '0.0.0')
  })

  mcp.registerTool(
    'list_components',
    {
      description: 'Список компонентов mediacube-ui-v2 (ai-catalog). Фильтр category: elements | patterns | templates',
      inputSchema: {
        category: z.string().optional(),
        limit: z.number().optional()
      }
    },
    async ({ category, limit }) => {
      const lim = limit ?? 500
      let list = catalog.components
      if (category) list = list.filter((c) => c.category === category)
      const slice = list.slice(0, lim).map((c) => ({
        id: c.id,
        name: c.name,
        category: c.category,
        importPath: c.importPath
      }))
      return { content: [{ type: 'text', text: JSON.stringify(slice, null, 2) }] }
    }
  )

  mcp.registerTool(
    'search_ui',
    {
      description: 'Поиск компонентов по тексту (props, id, типы)',
      inputSchema: {
        query: z.string(),
        category: z.string().optional()
      }
    },
    async ({ query, category }) => {
      const found = searchComponents(catalog, query, category)
      const slice = found.slice(0, 80).map((c) => ({
        id: c.id,
        name: c.name,
        importPath: c.importPath
      }))
      return { content: [{ type: 'text', text: JSON.stringify(slice, null, 2) }] }
    }
  )

  mcp.registerTool(
    'get_component',
    {
      description: 'Карточка компонента: id = путь от src/components без .vue (например elements/McButton/McButton)',
      inputSchema: {
        id: z.string()
      }
    },
    async ({ id }) => {
      const c = getComponentById(catalog, id)
      if (!c) {
        return {
          content: [{ type: 'text', text: JSON.stringify({ error: 'not found', id }) }],
          isError: true
        }
      }
      return { content: [{ type: 'text', text: JSON.stringify(c, null, 2) }] }
    }
  )

  mcp.registerTool(
    'list_types',
    {
      description:
        'Список снимков типов из ai-catalog (typesIndex): id, file, packageExport для импорта в приложении',
      inputSchema: {}
    },
    async () => {
      const list = catalog.typesIndex || []
      return { content: [{ type: 'text', text: JSON.stringify(list, null, 2) }] }
    }
  )

  mcp.registerTool(
    'get_type',
    {
      description:
        'Текст .ts по ключу из typesIndex: id (types/IFilter), file (types/IFilter.ts) или packageExport (mediacube-ui-v2/types/IFilter). Fallback: require.resolve из node_modules.',
      inputSchema: {
        id: z.string(),
        maxChars: z.number().optional()
      }
    },
    async ({ id, maxChars }) => {
      const cap = maxChars ?? 120000
      const payload = readTypeSource(catalog, id, cap)
      return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] }
    }
  )

  mcp.registerTool(
    'get_ai_guide',
    {
      description: 'Содержимое FOR_AI.md: установка, плагин, спрайты, импорты, ai-catalog',
      inputSchema: {
        maxChars: z.number().optional()
      }
    },
    async ({ maxChars }) => {
      const cap = maxChars ?? 200000
      const payload = readAiGuide(cap)
      return { content: [{ type: 'text', text: JSON.stringify(payload, null, 2) }] }
    }
  )

  for (const c of catalog.components) {
    const uri = `mediacube-ui://component/${encodeURIComponent(c.id)}`
    mcp.registerResource(
      `component:${c.id.replace(/\//g, '--')}`,
      uri,
      {
        description: c.importPath || c.id,
        mimeType: 'application/json'
      },
      async () => ({
        contents: [
          {
            uri,
            mimeType: 'application/json',
            text: JSON.stringify(c, null, 2)
          }
        ]
      })
    )
  }

  const transport = new StdioServerTransport()
  await mcp.connect(transport)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
