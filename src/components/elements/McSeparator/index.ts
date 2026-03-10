import { defineAsyncComponent } from 'vue'

const McSeparator = defineAsyncComponent(() => import('./McSeparator.vue'))
export { McSeparator }
export default McSeparator
