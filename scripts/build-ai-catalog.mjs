/**
 * Собирает dist/ai-catalog: index.json, types/, FOR_AI.md, recommended-entrypoints.json, catalog.schema.json
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import { parse } from 'vue-docgen-api'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const componentsRoot = path.join(root, 'src', 'components')
const outDir = path.join(root, 'dist', 'ai-catalog')
const typesOutDir = path.join(outDir, 'types')
const enumsOutDir = path.join(outDir, 'enums')

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'ai-catalog.config.json'), 'utf8'))

const CATALOG_SCHEMA_VERSION = 2
const MAX_STORY_HINTS_CHARS = 12000

function matchesDenylist(relFromComponents) {
  return config.denylist?.some((entry) => {
    const re = new RegExp(entry.pattern)
    return re.test(relFromComponents)
  })
}

function componentId(relFromComponents) {
  return relFromComponents.replace(/\.vue$/i, '')
}

function categoryFromId(id) {
  const first = id.split('/')[0]
  if (['elements', 'patterns', 'templates'].includes(first)) return first
  return 'root'
}

function resolveImportPath(relFromComponents) {
  const noExt = componentId(relFromComponents)
  if (categoryFromId(noExt) === 'root') return null
  return `${pkg.name}/components/${noExt}`
}

function readAiDoc(vuePath) {
  const aiMd = vuePath.replace(/\.vue$/i, '.ai.md')
  if (fs.existsSync(aiMd)) return fs.readFileSync(aiMd, 'utf8').trim()
  return ''
}

function findStoryFile(vuePath) {
  const dir = path.dirname(vuePath)
  const stories = fs.readdirSync(dir).filter((f) => f.endsWith('.stories.ts') || f.endsWith('.stories.js'))
  if (!stories.length) return null
  return path.join(dir, stories[0])
}

function extractStoryExports(storyPath) {
  if (!storyPath || !fs.existsSync(storyPath)) return []
  const src = fs.readFileSync(storyPath, 'utf8')
  const names = []
  const re = /export\s+const\s+(\w+)\s*:\s*Story\b/g
  let m
  while ((m = re.exec(src))) names.push(m[1])
  const re2 = /export\s+const\s+(\w+)\s*=\s*\{/g
  while ((m = re2.exec(src))) {
    if (!names.includes(m[1]) && m[1] !== 'meta') names.push(m[1])
  }
  return [...new Set(names)]
}

function extractRelatedTypes(vueSource) {
  const set = new Set()
  const re = /from\s+['"]@\/types\/([^'"]+)['"]/g
  let m
  while ((m = re.exec(vueSource))) set.add(`@/types/${m[1]}`)
  return [...set].sort()
}

function extractEnumImports(vueSource) {
  const set = new Set()
  const re = /from\s+['"]@\/enums\/([^'"]+)['"]/g
  let m
  while ((m = re.exec(vueSource))) set.add(`@/enums/${m[1]}`)
  return [...set].sort()
}

function resolveSrcFileFromAlias(importPath) {
  if (importPath.startsWith('@/types/')) {
    const rest = importPath.slice('@/types/'.length)
    const candidates = [
      path.join(root, 'src', 'types', rest),
      path.join(root, 'src', 'types', rest + '.ts'),
      path.join(root, 'src', 'types', rest, 'index.ts')
    ]
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c
    }
  }
  if (importPath.startsWith('@/enums/')) {
    const rest = importPath.slice('@/enums/'.length)
    const candidates = [
      path.join(root, 'src', 'enums', rest + '.ts'),
      path.join(root, 'src', 'enums', rest, 'index.ts'),
      path.join(root, 'src', 'enums', rest)
    ]
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return c
    }
  }
  return null
}

function toCatalogTypeEntry(absSrcPath) {
  const rel = path.relative(path.join(root, 'src'), absSrcPath).replace(/\\/g, '/')
  if (!rel.endsWith('.ts')) return null
  if (rel.startsWith('types/')) {
    const short = rel.replace(/^types\//, '').replace(/\.ts$/, '')
    return {
      id: `types/${short}`,
      file: rel,
      packageExport: `${pkg.name}/types/${short}`
    }
  }
  if (rel.startsWith('enums/')) {
    const short = rel.replace(/^enums\//, '').replace(/\.ts$/, '')
    return {
      id: `enums/${short}`,
      file: rel,
      packageExport: `${pkg.name}/enums/${short}`
    }
  }
  return null
}

function collectAllTypeFiles(components) {
  const absSet = new Set()
  for (const c of components) {
    const vuePath = path.join(root, c.filePath)
    if (!fs.existsSync(vuePath)) continue
    const src = fs.readFileSync(vuePath, 'utf8')
    for (const imp of extractRelatedTypes(src)) {
      const f = resolveSrcFileFromAlias(imp)
      if (f) absSet.add(f)
    }
    for (const imp of extractEnumImports(src)) {
      const f = resolveSrcFileFromAlias(imp)
      if (f) absSet.add(f)
    }
  }
  for (const name of config.typesAllowlist || []) {
    const f = path.join(root, 'src', 'types', name)
    if (fs.existsSync(f)) absSet.add(f)
  }
  return [...absSet].sort((a, b) => a.localeCompare(b))
}

function copyTypeFiles(absFiles) {
  fs.mkdirSync(typesOutDir, { recursive: true })
  fs.mkdirSync(enumsOutDir, { recursive: true })
  const typesIndex = []
  for (const abs of absFiles) {
    const relFromSrc = path.relative(path.join(root, 'src'), abs).replace(/\\/g, '/')
    const dest = path.join(outDir, relFromSrc)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(abs, dest)
    const entry = toCatalogTypeEntry(abs)
    if (entry) typesIndex.push(entry)
  }
  const seen = new Set()
  const unique = []
  for (const e of typesIndex) {
    if (seen.has(e.id)) continue
    seen.add(e.id)
    unique.push(e)
  }
  unique.sort((a, b) => a.id.localeCompare(b.id))
  return unique
}

function extractFromOpenBrace(src, openIdx) {
  let depth = 0
  let inStr = null
  let escaped = false
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i]
    if (escaped) {
      escaped = false
      continue
    }
    if (inStr === '`') {
      if (c === '\\') escaped = true
      else if (c === '`') inStr = null
      continue
    }
    if (inStr) {
      if (c === '\\') escaped = true
      else if (c === inStr) inStr = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') {
      inStr = c
      continue
    }
    if (c === '{') depth++
    else if (c === '}') {
      depth--
      if (depth === 0) return src.slice(openIdx, i + 1)
    }
  }
  return null
}

function extractArgsObjectAfterKey(block) {
  const m = /\bargs\s*:\s*/.exec(block)
  if (!m) return null
  const pos = m.index + m[0].length
  const braceAt = block.indexOf('{', pos)
  if (braceAt === -1) return null
  return extractFromOpenBrace(block, braceAt)
}

function tryParseObjectString(str) {
  if (!str) return null
  const s = str.trim()
  try {
    return JSON.parse(s)
  } catch {
    try {
      return JSON.parse(s.replace(/,\s*([}\]])/g, '$1'))
    } catch {
      return { _unparsedSnippet: s.slice(0, 6000) }
    }
  }
}

function truncateStoryHints(hints) {
  const base = {
    metaArgs: hints.metaArgs,
    stories: hints.stories,
    storyParseError: hints.storyParseError
  }
  if (JSON.stringify(base).length <= MAX_STORY_HINTS_CHARS) return base
  if (base.stories && typeof base.stories === 'object') {
    const keys = Object.keys(base.stories)
    for (let n = keys.length; n >= 0; n--) {
      const trimmed = {
        ...base,
        stories: n ? Object.fromEntries(keys.slice(0, n).map((k) => [k, base.stories[k]])) : null
      }
      if (JSON.stringify(trimmed).length <= MAX_STORY_HINTS_CHARS) return trimmed
    }
  }
  return {
    metaArgs: base.metaArgs ? { _truncated: true } : null,
    stories: null,
    storyParseError: base.storyParseError
  }
}

function extractStoryHints(storyPath) {
  const empty = { metaArgs: null, stories: null, storyParseError: null }
  if (!storyPath || !fs.existsSync(storyPath)) return empty
  const src = fs.readFileSync(storyPath, 'utf8')
  let storyParseError = null
  const stories = {}
  let metaArgs = null
  try {
    const metaStart = src.indexOf('const meta')
    const metaEnd = src.indexOf('satisfies Meta', metaStart)
    const metaBlock =
      metaStart >= 0 && metaEnd > metaStart ? src.slice(metaStart, metaEnd) : ''
    if (metaBlock) {
      const raw = extractArgsObjectAfterKey(metaBlock)
      if (raw) metaArgs = tryParseObjectString(raw)
    }
    const storyRe = /export\s+const\s+(\w+)\s*:\s*Story\s*=\s*\{/g
    let sm
    while ((sm = storyRe.exec(src))) {
      const name = sm[1]
      if (name === 'meta') continue
      const openIdx = sm.index + sm[0].length - 1
      const storyObj = extractFromOpenBrace(src, openIdx)
      if (!storyObj) continue
      const inner = storyObj.slice(1, -1)
      const argsRaw = extractArgsObjectAfterKey(inner)
      if (argsRaw) stories[name] = tryParseObjectString(argsRaw)
    }
  } catch (e) {
    storyParseError = e instanceof Error ? e.message : String(e)
  }
  const out = {
    metaArgs,
    stories: Object.keys(stories).length ? stories : null,
    storyParseError
  }
  if (!metaArgs && !out.stories && !storyParseError) return empty
  return truncateStoryHints(out)
}

function normalizeDocgenProp(p) {
  return {
    name: p.name,
    type: p.type?.name ?? p.type,
    required: !!p.required,
    defaultValue: p.defaultValue?.value ?? p.defaultValue,
    description: p.description ?? ''
  }
}

function normalizeDocgenEvent(e) {
  return {
    name: e.name,
    type: e.type?.names?.join(' | ') ?? e.properties?.map((x) => x.name).join(', '),
    description: e.description ?? ''
  }
}

function normalizeDocgenSlot(s) {
  return {
    name: s.name,
    description: s.description ?? ''
  }
}

async function buildComponentEntry(absVuePath) {
  const relFromComponents = path.relative(componentsRoot, absVuePath).replace(/\\/g, '/')
  const id = componentId(relFromComponents)
  const vueSource = fs.readFileSync(absVuePath, 'utf8')
  const storyFile = findStoryFile(absVuePath)
  const storyExports = extractStoryExports(storyFile)
  const relatedTypeImports = extractRelatedTypes(vueSource)
  const storyHints = extractStoryHints(storyFile)

  let props = []
  let emits = []
  let slots = []
  let docgenError = null

  try {
    const doc = await parse(absVuePath, {
      alias: {
        '@': path.join(root, 'src'),
        '~': path.join(root, 'src')
      }
    })
    props = (doc.props || []).map(normalizeDocgenProp)
    emits = (doc.events || []).map(normalizeDocgenEvent)
    slots = (doc.slots || []).map(normalizeDocgenSlot)
  } catch (err) {
    docgenError = err instanceof Error ? err.message : String(err)
  }

  const baseName = path.basename(absVuePath, '.vue')
  const aiDoc = readAiDoc(absVuePath)
  const importPath = resolveImportPath(relFromComponents)
  const searchText = [
    id,
    baseName,
    importPath,
    ...props.map((p) => p.name),
    ...emits.map((e) => e.name),
    ...relatedTypeImports
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  const entry = {
    id,
    name: baseName,
    filePath: path.relative(root, absVuePath).replace(/\\/g, '/'),
    category: categoryFromId(id),
    importPath,
    props,
    emits,
    slots,
    storyFile: storyFile ? path.relative(root, storyFile).replace(/\\/g, '/') : null,
    storyExports,
    storyHints:
      storyHints.metaArgs || storyHints.stories || storyHints.storyParseError ? storyHints : null,
    relatedTypeImports,
    searchText,
    aiDoc,
    docgenError
  }
  return entry
}

async function main() {
  const pattern = path.join(componentsRoot, '**/*.vue').replace(/\\/g, '/')
  const allAbs = await glob(pattern, { absolute: true, posix: true })

  const included = []
  for (const abs of allAbs) {
    const rel = path.relative(componentsRoot, abs).replace(/\\/g, '/')
    if (matchesDenylist(rel)) continue
    included.push(abs)
  }
  included.sort((a, b) => a.localeCompare(b))

  const components = []
  for (const abs of included) {
    components.push(await buildComponentEntry(abs))
  }

  const typeFiles = collectAllTypeFiles(components)
  const typesIndex = copyTypeFiles(typeFiles)

  const ids = components.map((c) => c.id).sort()
  const pathHash = crypto.createHash('sha256').update(ids.join('\n')).digest('hex').slice(0, 16)

  const recommendedSrc = path.join(__dirname, 'ai-catalog', 'recommended-entrypoints.json')
  const recommended = JSON.parse(fs.readFileSync(recommendedSrc, 'utf8'))
  delete recommended.$comment

  const catalog = {
    catalogSchemaVersion: CATALOG_SCHEMA_VERSION,
    libraryVersion: pkg.version,
    packageName: pkg.name,
    pathHash,
    componentCount: components.length,
    typesIndex,
    typesFileCount: typesIndex.length,
    components,
    recommendedEntrypoints: recommended
  }

  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(catalog, null, 2), 'utf8')
  fs.copyFileSync(
    path.join(__dirname, 'ai-catalog', 'catalog.schema.json'),
    path.join(outDir, 'catalog.schema.json')
  )
  fs.copyFileSync(path.join(__dirname, 'ai-catalog', 'FOR_AI.md'), path.join(outDir, 'FOR_AI.md'))
  fs.writeFileSync(
    path.join(outDir, 'recommended-entrypoints.json'),
    JSON.stringify(recommended, null, 2),
    'utf8'
  )

  console.log(
    `ai-catalog: ${components.length} components, ${typesIndex.length} type files → dist/ai-catalog/`
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
