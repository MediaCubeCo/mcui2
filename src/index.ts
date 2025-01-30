import { App } from 'vue'
import { IDSOptions } from '@/types/IDSOptions'

export * from './types'
export * from './enums'
export * from './components'
export * from './composables'
export * from './consts'
export * from './utils'
export * from './assets/tokens/json'

export default {
  install(app: App, options = {}) {
    const defaultOptions: IDSOptions = {
      drawerComponents: {},
      modalComponents: {},
      toasts: {},
      router: null
    }
    app.config.globalProperties.$dsOptions = { ...defaultOptions, ...options }
    app.provide('dsOptions', { ...defaultOptions, ...options })
  }
}
