function isEmpty(value: any): boolean {
  if (value == null) return true
  if (Array.isArray(value) || typeof value === 'string') {
    return value.length === 0
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }
  return false
}

function isEqual(value1: any, value2: any) {
  if (value1 === value2) {
    return true
  }
  if (typeof value1 !== 'object' || typeof value2 !== 'object' || value1 === null || value2 === null) {
    return false
  }
  if (Array.isArray(value1) !== Array.isArray(value2)) {
    return false
  }
  const keys1 = Object.keys(value1)
  const keys2 = Object.keys(value2)

  if (keys1.length !== keys2.length) {
    return false
  }
  for (const key of keys1) {
    if (!isEqual(value1[key], value2[key])) {
      return false
    }
  }
  return true
}

function cloneDeep(value: any): any {
  if (value === null || typeof value !== 'object') {
    return value
  }
  if (Array.isArray(value)) {
    return value.map(cloneDeep)
  }
  const clonedObj: any = {}
  for (const key in value) {
    if (hasProperty(value, key)) {
      clonedObj[key] = cloneDeep(value[key])
    }
  }
  return clonedObj
}

function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
  return array.reduce<T[]>((acc, current) => {
    if (!acc.some((item) => comparator(item, current))) {
      acc.push(current)
    }
    return acc
  }, [])
}

function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]))
    }
  }
  Object.assign(target || {}, source)
  return target
}

function hasProperty(object: object, prop: string) {
  return Object.prototype.hasOwnProperty.call(object, prop)
}
function isNumber(payload: any) {
  return typeof payload === 'number'
}

function upperFirst(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function useHelper() {
  return { isEmpty, isEqual, cloneDeep, uniqWith, deepMerge, hasProperty, isNumber, upperFirst }
}
