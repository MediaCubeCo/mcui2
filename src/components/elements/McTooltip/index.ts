import { defineAsyncComponent } from 'vue'

const McTooltip = defineAsyncComponent(() => import('./McTooltip.vue'))
export { McTooltip }
export default McTooltip
