import { defineAsyncComponent } from 'vue'

const McFilter = defineAsyncComponent(() => import('./McFilter.vue'))
export { McFilter }
export default McFilter
