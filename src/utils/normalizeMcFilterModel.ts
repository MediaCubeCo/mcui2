import { FilterRelations, FilterTypes } from '@/enums/Filter'
import type {
  FilterConditionName,
  IFilter,
  IFilterParsedValueFilter,
  IFilterParsedValueFilterName,
  IRelationFilter,
  FilterRelationName
} from '@/types/IFilter'

function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep) as unknown as T
  }
  const clonedObj: Record<string, unknown> = {}
  for (const key in value as object) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObj[key] = cloneDeep((value as Record<string, unknown>)[key])
    }
  }
  return clonedObj as T
}

function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRelationShaped(val: unknown): val is Record<string, unknown> {
  if (!isPlainObject(val)) return false
  return (
    FilterRelations.Exists in val || FilterRelations.Is in val || FilterRelations.IsNot in val
  )
}

function optionLabelMap(schema: IRelationFilter): Map<string, string> {
  const m = new Map<string, string>()
  if ('options' in schema && schema.options) {
    for (const opt of schema.options) {
      m.set(String(opt.value), String(opt.name))
    }
  }
  return m
}

function buildRelationFilterName(
  filterVal: Record<string, unknown>,
  isText: boolean,
  labelByValue: Map<string, string>
): FilterRelationName {
  const name: FilterRelationName = {}

  const idsToRecord = (ids: unknown): Record<string, string> => {
    if (!Array.isArray(ids)) return {}
    const out: Record<string, string> = {}
    for (const id of ids) {
      const sid = String(id)
      out[sid] = isText ? sid : labelByValue.get(sid) ?? sid
    }
    return out
  }

  if (Object.prototype.hasOwnProperty.call(filterVal, FilterRelations.Exists)) {
    name[FilterRelations.Exists] = null
  }

  if (filterVal[FilterRelations.Is] !== undefined) {
    const rec = idsToRecord(filterVal[FilterRelations.Is])
    if (!isEmpty(rec)) {
      name[FilterRelations.Is] = rec
    }
  }

  if (filterVal[FilterRelations.IsNot] !== undefined) {
    const rec = idsToRecord(filterVal[FilterRelations.IsNot])
    if (!isEmpty(rec)) {
      name[FilterRelations.IsNot] = rec
    }
  }

  return name
}

function shouldBackfillName(block: unknown): boolean {
  return block == null || isEmpty(block)
}

function backfillFilterNameForKey(
  key: string,
  rawFilter: IFilterParsedValueFilter,
  filterName: IFilterParsedValueFilterName,
  meta: IFilter
): void {
  if (!shouldBackfillName(filterName[key])) return

  const cond = rawFilter[key]
  if (cond === undefined) return

  switch (meta.type) {
    case FilterTypes.Text: {
      filterName[key] = cond as FilterConditionName
      break
    }
    case FilterTypes.Range:
    case FilterTypes.Date: {
      if (isPlainObject(cond)) {
        filterName[key] = { ...(cond as Record<string, unknown>) } as FilterConditionName
      }
      break
    }
    case FilterTypes.Relation: {
      const rel = meta as IRelationFilter
      if (!isRelationShaped(cond)) break
      const labels = optionLabelMap(rel)
      filterName[key] = buildRelationFilterName(cond, rel.is_text, labels) as FilterConditionName
      break
    }
    case FilterTypes.Fast: {
      if (isRelationShaped(cond)) {
        filterName[key] = buildRelationFilterName(cond, true, new Map()) as FilterConditionName
      } else {
        filterName[key] = cond as FilterConditionName
      }
      break
    }
    default:
      break
  }
}

/**
 * Оставляет только ключи из schema, вычищает «осиротевшие» filter_name,
 * восстанавливает filter_name из filter для text / range / date / relation / fast.
 */
export function normalizeMcFilterModel(
  rawFilter: IFilterParsedValueFilter | null | undefined,
  rawFilterName: IFilterParsedValueFilterName | null | undefined,
  schema: IFilter[]
): { filter: IFilterParsedValueFilter; filter_name: IFilterParsedValueFilterName } {
  const filter: IFilterParsedValueFilter = isPlainObject(rawFilter) ? cloneDeep(rawFilter) : {}
  const filter_name: IFilterParsedValueFilterName =
    isPlainObject(rawFilterName) && !Array.isArray(rawFilterName)
      ? cloneDeep(rawFilterName)
      : {}

  const allowed = new Set(schema.map((f) => String(f.value)))

  for (const key of Object.keys(filter)) {
    if (!allowed.has(key)) {
      delete filter[key]
    }
  }
  for (const key of Object.keys(filter_name)) {
    if (!allowed.has(key)) {
      delete filter_name[key]
    }
  }
  for (const key of Object.keys(filter_name)) {
    if (!(key in filter)) {
      delete filter_name[key]
    }
  }

  const schemaByKey = new Map<string, IFilter>()
  for (const f of schema) {
    schemaByKey.set(String(f.value), f)
  }

  for (const key of Object.keys(filter)) {
    const meta = schemaByKey.get(key)
    if (!meta) continue
    backfillFilterNameForKey(key, filter, filter_name, meta)
  }

  return { filter, filter_name }
}
