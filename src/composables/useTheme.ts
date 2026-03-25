import { inject } from 'vue'
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
  const components = dsOptions.theme
    ? // @ts-ignore
    (dsOptions?.themes.value?.[dsOptions.theme]?.components ?? UiThemes.light.components)
    : UiThemes.light.components

  return {
    // @ts-ignore
    colors: dsOptions?.colors?.value || Colors,
    components,
    component: componentName && components?.[componentName] ? components[componentName] : {}
  }
}

export function useTheme(component?: string): ThemeReactive {
  const dsOptions = inject<IDSOptions>('dsOptions', {} as IDSOptions)
  const cacheKey = component ?? ''

  if (!themeCache.has(cacheKey)) {
    themeCache.set(cacheKey, createThemeReactive(cacheKey, dsOptions))
  }
  return themeCache.get(cacheKey)!
}
