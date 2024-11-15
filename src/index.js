export * from './types'
export * from './enums'
export * from './components'
export * from './composables'
export * from './assets/tokens/json'
export * from './assets/iconsSprite.svg'

export default {
  install(app, options = {}) {
    const defaultOptions = {
      drawerComponents: {},
      modalComponents: {}
    }
    app.config.globalProperties.$dsOptions = { ...defaultOptions, ...options }
  }
}
