import { inject, reactive } from 'vue'
import { Colors } from '@/types/styles/Colors'
import { IDSOptions } from '@/types/IDSOptions'
import { UiThemes } from '@/types/styles/ColorTheme'

export function useTheme(component?: string) {
  const dsOptions = inject<IDSOptions>('dsOptions', {} as IDSOptions)
  const components = dsOptions.theme ? dsOptions.themes?.[dsOptions.theme]?.components : UiThemes.light.components
  //@ts-ignore
  const componentData = component ? components![component] : {}

  return reactive({
    colors: dsOptions.colors || Colors,
    components,
    component: componentData
  })
}
