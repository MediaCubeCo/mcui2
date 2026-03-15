import { inject, reactive } from 'vue'
import { Colors } from '@/types/styles/Colors'
import { IDSOptions } from '@/types/IDSOptions'
import { UiThemes } from '@/types/styles/ColorTheme'

type ThemeReactive = {
  colors: Record<string, string>
  components: Record<string, unknown>
  component: Record<string, unknown>
}

const themeCache = new Map<string, ThemeReactive>()

function createThemeReactive(componentName: string, dsOptions: IDSOptions): ThemeReactive {
  return reactive({
    get colors() {
      return dsOptions.colors || Colors
    },
    get components() {
      return dsOptions.theme
        ? dsOptions.themes?.[dsOptions.theme]?.components ?? UiThemes.light.components
        : UiThemes.light.components
    },
    get component() {
      const comps = dsOptions.theme
        ? dsOptions.themes?.[dsOptions.theme]?.components ?? UiThemes.light.components
        : UiThemes.light.components
      //@ts-ignore
      return (componentName && comps?.[componentName] ? comps[componentName] : {}) as Record<string, unknown>
    }
  }) as ThemeReactive
}

export function useTheme(component?: string): ThemeReactive {
  const dsOptions = inject<IDSOptions>('dsOptions', {} as IDSOptions)
  const cacheKey = component ?? ''

  if (!themeCache.has(cacheKey)) {
    themeCache.set(cacheKey, createThemeReactive(cacheKey, dsOptions))
  }
  return themeCache.get(cacheKey)!
}
