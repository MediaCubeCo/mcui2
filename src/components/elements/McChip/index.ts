import { defineAsyncComponent } from 'vue'

const McChip = defineAsyncComponent(() => import('./McChip.vue'))
export { McChip }
export default McChip
