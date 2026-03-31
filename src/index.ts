import { App, computed } from 'vue'
import { setStoredAppContext } from './storedAppContext'
import type { IDSOptions } from '@/types/IDSOptions'
import { Themes } from '@/enums/Themes'
import { ThemesColors, UiThemes } from '@/types/styles/ColorTheme'
import defaultAvatar from './assets/img/no_user.png'
import { useHelper } from '@/composables/useHelper'
import { createProxy } from '@/utils/proxy'
const helper = useHelper()

function mergeDefined<T extends Record<string, unknown>>(defaults: T, overrides?: Partial<T>): T {
  if (!overrides) return defaults

  const definedEntries = Object.entries(overrides).filter(([, value]) => value !== undefined)

  return {
    ...defaults,
    ...Object.fromEntries(definedEntries)
  } as T
}

export default {
  install(app: App, options: IDSOptions = {}) {
    const defaultOptions: IDSOptions = {
      drawerComponents: {},
      modalComponents: {},
      toasts: {},
      defaultAvatar,
      colors: ThemesColors,
      themes: UiThemes,
      theme: Themes.Light,
      meta: {
        router_push: null
      }
    }

    const mergedThemes = helper.deepMerge(defaultOptions.themes, options.themes)
    const dsOptions = {
      ...defaultOptions,
      ...options,
      colors: computed(() => mergeDefined(defaultOptions.colors!, options.colors)),
      themes: computed(() => mergedThemes),
      meta: options.meta ? createProxy(defaultOptions.meta!, options.meta) : defaultOptions.meta
    }

    app.config.globalProperties.$dsOptions = dsOptions
    app.provide('dsOptions', dsOptions)
    setStoredAppContext((app as App & { _context?: unknown })._context ?? null)
  }
}
