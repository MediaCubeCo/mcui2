import { App } from 'vue'
import { setStoredAppContext } from './storedAppContext'
import type { IDSOptions } from '@/types/IDSOptions'
import { Themes } from '@/enums/Themes'
import { ThemesColors, UiThemes } from '@/types/styles/ColorTheme'
import defaultAvatar from './assets/img/no_user.png'
import { createProxy } from '@/utils/proxy'

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

    const dsOptions = {
      ...defaultOptions,
      ...options,
      colors: options.colors ? createProxy(defaultOptions.colors!, options.colors) : defaultOptions.colors,
      themes: options.themes ? createProxy(defaultOptions.themes!, options.themes) : defaultOptions.themes,
      meta: options.meta ? createProxy(defaultOptions.meta!, options.meta) : defaultOptions.meta
    }

    app.config.globalProperties.$dsOptions = dsOptions
    app.provide('dsOptions', dsOptions)
    setStoredAppContext((app as App & { _context?: unknown })._context ?? null)
  }
}
