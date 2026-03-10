import { defineAsyncComponent } from 'vue'

const McTopBar = defineAsyncComponent(() => import('./McTopBar.vue'))
export { McTopBar }
export default McTopBar
