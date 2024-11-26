import { App } from 'vue'

export * from './types'
export * from './enums'
export * from './components'
export * from './composables'
export * from './consts'
export * from './utils'
export * from './assets/tokens/json'
import './assets/fonts/inter/inter.css'
import './assets/iconsSprite.svg'

export default {
  install(app: App, options = {}) {
    const defaultOptions = {
      drawerComponents: {},
      modalComponents: {}
    }
    app.config.globalProperties.$dsOptions = { ...defaultOptions, ...options }
  }
}
