import { defineAsyncComponent } from 'vue'

const McFilterChip = defineAsyncComponent(() => import('./McFilterChip.vue'))
export { McFilterChip }
export default McFilterChip
