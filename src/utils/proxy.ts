/**
 *  Для создания корректного реактивного результата, overrides - должен быть реактивным
 *  На выходе получается реактивный обьект, который при обращении к свойствам, достает значения из overrides или из дефолтных значений
 * */
function isObject(val: any): val is Record<string, any> {
  return val && val.constructor === Object
}

export function createProxy(defaults: any, overrides: any): any {
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