import { defineAsyncComponent } from 'vue'

const McOverlay = defineAsyncComponent(() => import('./McOverlay.vue'))
export { McOverlay }
export default McOverlay
