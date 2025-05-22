import { reactive } from 'vue'

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

function pickDeep(object: { [key: string]: any } | object[], keys: string[]): { [key: string]: any } {
  if (!object) return object

  if (object.constructor === Array) return object.map((item) => pickDeep(item, keys))
  if (object.constructor === Object) {
    const result: { [key: string]: any } = {}
    keys.forEach((key) => {
      const [first, ...rest]: string[] = key.split('.')

      if (rest.length === 0) {
        //@ts-ignore
        result[first] = object?.[first]
      } else {
        result[first] = {
          ...(result[first] || {}),
          //@ts-ignore
          ...pickDeep(object?.[first] ?? {}, [rest.join('.')])
        }
      }
    })

    return result
  }
  return object
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

/**
 *  Для создания корректного реактивного результата, overrides - должен быть реактивным
 *  На выходе получается реактивный обьект, который при обращении к свойствам, достает значения из overrides или из дефолтных значений
 * */
function mergeReactiveDefaults<T>(defaults: T, overrides: Partial<T>) {
  function isObject(val: any): val is Record<string, any> {
    return val && val.constructor === Object
  }

  function createProxy(defaults: any, overrides: any): any {
    return new Proxy(
      {},
      {
        get(target, key: string) {
          const default_value = defaults?.[key]
          const override_value = overrides?.[key]

          if (isObject(default_value) || isObject(override_value)) {
            return createProxy(default_value || {}, override_value || {})
          }

          return override_value !== undefined ? override_value : default_value
        },
        set(target, key: string, value) {
          if (!isObject(overrides)) return false
          overrides[key] = value
          return true
        },
        ownKeys() {
          return Array.from(new Set([...Object.keys(defaults), ...Object.keys(overrides)]))
        },
        getOwnPropertyDescriptor() {
          return {
            enumerable: true,
            configurable: true
          }
        }
      }
    )
  }

  return reactive(createProxy(defaults, overrides)) as T
}

function setNested(object: any, path: string, value: any) {
  const keys = path.split('.')
  const last = keys.pop()!

  let current = object
  for (const k of keys) {
    if (!(k in current)) current[k] = {}
    current = current[k]
  }

  current[last] = value
}

function getNested(object: any, path: string): any {
  if (path?.constructor !== String) return undefined
  return path.split('.').reduce((o, key) => (o ? o[key] : undefined), object)
}

export function useHelper() {
  return {
    isEmpty,
    isEqual,
    cloneDeep,
    uniqWith,
    deepMerge,
    hasProperty,
    isNumber,
    upperFirst,
    pickDeep,
    mergeReactiveDefaults,
    setNested,
    getNested
  }
}
