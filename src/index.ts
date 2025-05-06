import { App } from 'vue'
import { IDSOptions } from './types'

export * as types from './types'
export * as enums from './enums'
export * as components from './components'
export * as composables from './composables'
export * as consts from './consts'
export * as utils from './utils'
export * as tokens from './assets/tokens/json'

export default {
  install(app: App, options = {}) {
    const defaultOptions: IDSOptions = {
      drawerComponents: {},
      modalComponents: {},
      toasts: {},
      defaultAvatar: '/assets/img/no_user.png',
      router: null
    }
    app.config.globalProperties.$dsOptions = { ...defaultOptions, ...options }
    app.provide('dsOptions', { ...defaultOptions, ...options })
  }
}
