import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const srcRoot = path.join(repoRoot, 'src')

function toPosix(filePath: string): string {
    return filePath.split(path.sep).join('/')
}

/** Ключ Rollup: путь от src без расширения, например components/elements/McButton/index */
function addTsEntry(entries: Record<string, string>, absFile: string): void {
    const rel = toPosix(path.relative(srcRoot, absFile))
    const key = rel.replace(/\.ts$/, '')
    entries[key] = absFile
}

/** Все `index.ts` под `src/components` (рекурсивно). */
function walkComponents(dir: string, entries: Record<string, string>): void {
    if (!fs.existsSync(dir)) return

    const indexPath = path.join(dir, 'index.ts')
    if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
        addTsEntry(entries, indexPath)
    }

    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
        if (d.isDirectory()) {
            walkComponents(path.join(dir, d.name), entries)
        }
    }
}

/** composables/*.ts — только файлы в корне composables (без .js-дублей) */
function addComposables(entries: Record<string, string>): void {
    const dir = path.join(srcRoot, 'composables')
    if (!fs.existsSync(dir)) return

    for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
        if (d.isFile() && d.name.endsWith('.ts')) {
            const abs = path.join(dir, d.name)
            const base = d.name.replace(/\.ts$/, '')
            entries[`composables/${base}`] = abs
        }
    }
}


function walkAllTs(subdir: string, entries: Record<string, string>): void {
    const root = path.join(srcRoot, subdir)
    if (!fs.existsSync(root)) return

    const walk = (dir: string): void => {
        for (const d of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, d.name)
            if (d.isDirectory()) {
                walk(full)
            } else if (d.isFile() && d.name.endsWith('.ts')) {
                addTsEntry(entries, full)
            }
        }
    }
    walk(root)
}

/**
 * Multi-entry для library mode: каждый компонент / composable / enum / utils
 * попадает в dist при preserveModules (граф от корневого index.ts их не тянет).
 */
export function resolveLibEntries(): Record<string, string> {
    const entries: Record<string, string> = {
        index: path.join(srcRoot, 'index.ts'),
    }

    walkComponents(path.join(srcRoot, 'components'), entries)
    addComposables(entries)
    walkAllTs('enums', entries)
    walkAllTs('utils', entries)

    return entries
}
