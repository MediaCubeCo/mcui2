import { defineAsyncComponent } from 'vue'

const McProgress = defineAsyncComponent(() => import('./McProgress.vue'))
export { McProgress }
export default McProgress
