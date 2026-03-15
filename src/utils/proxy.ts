/**
 *  Для создания корректного реактивного результата, overrides - должен быть реактивным
 *  На выходе получается реактивный обьект, который при обращении к свойствам, достает значения из overrides или из дефолтных значений
 * */
function isObject(val: any): val is Record<string, any> {
  return val && val.constructor === Object
}

/** Кэш прокси по паре (defaults, overrides) для стабильных объектных ссылок */
const proxyCache = new WeakMap<object, WeakMap<object, any>>()

function canCacheProxy(defaults: unknown, overrides: unknown): defaults is object {
  return (
    defaults !== null &&
    typeof defaults === 'object' &&
    overrides !== null &&
    typeof overrides === 'object'
  )
}

export function createProxy(defaults: any, overrides: any): any {
  if (canCacheProxy(defaults, overrides)) {
    const byOverrides = proxyCache.get(defaults)
    const cached = byOverrides?.get(overrides)
    if (cached) return cached
  }

  const proxy = new Proxy(
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

  if (canCacheProxy(defaults, overrides)) {
    let byOverrides = proxyCache.get(defaults)
    if (!byOverrides) {
      byOverrides = new WeakMap()
      proxyCache.set(defaults, byOverrides)
    }
    byOverrides.set(overrides, proxy)
  }

  return proxy
}