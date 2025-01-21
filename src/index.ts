import { App } from 'vue'

export * from './types'
export * from './enums'
export * from './components'
export * from './composables'
export * from './consts'
export * from './utils'
export * from './assets/tokens/json'

export default {
  install(app: App, options = {}) {
    const defaultOptions = {
      drawerComponents: {},
      modalComponents: {},
      toasts: {}
    }
    app.config.globalProperties.$dsOptions = { ...defaultOptions, ...options }
  }
}
