import { defineAsyncComponent } from 'vue'

const McFieldRange = defineAsyncComponent(() => import('./McFieldRange.vue'))
export { McFieldRange }
export default McFieldRange
