import { defineAsyncComponent } from 'vue'

const McCollapse = defineAsyncComponent(() => import('./McCollapse.vue'))
export { McCollapse }
export default McCollapse
