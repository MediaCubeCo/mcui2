import { inject } from 'vue'
import { Colors } from '@/types/styles/Colors'
import { IDSOptions } from '@/types/IDSOptions'
import { UiThemes } from '@/types/styles/ColorTheme'

type ThemeReactive = {
  readonly colors: Record<string, string>
  readonly components: Record<string, unknown>
  readonly component: Record<string, unknown>
}

const themeCache = new Map<string, ThemeReactive>()

function createThemeReactive(componentName: string, dsOptions: IDSOptions): ThemeReactive {
  return Object.defineProperties(
    {},
    {
      colors: {
        enumerable: true,
        get() {
          // @ts-ignore
          return dsOptions?.colors?.value || Colors
        }
      },
      components: {
        enumerable: true,
        get() {
          const components = dsOptions.theme
            ? // @ts-ignore
            (dsOptions?.themes?.value?.[dsOptions.theme]?.components ?? UiThemes.light.components)
            : UiThemes.light.components
          return components
        }
      },
      component: {
        enumerable: true,
        get() {
          const components = dsOptions.theme
            ? // @ts-ignore
            (dsOptions?.themes?.value?.[dsOptions.theme]?.components ?? UiThemes.light.components)
            : UiThemes.light.components
          return componentName && components?.[componentName] ? components[componentName] : {}
        }
      }
    }
  ) as ThemeReactive
}

export function useTheme(component?: string): ThemeReactive {
  const dsOptions = inject<IDSOptions>('dsOptions', {} as IDSOptions)
  const cacheKey = component ?? ''

  if (!themeCache.has(cacheKey)) {
    themeCache.set(cacheKey, createThemeReactive(cacheKey, dsOptions))
  }
  return themeCache.get(cacheKey)!
}
