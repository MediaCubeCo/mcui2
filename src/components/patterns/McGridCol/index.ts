import { defineAsyncComponent } from 'vue'

const McGridCol = defineAsyncComponent(() => import('./McGridCol.vue'))
export { McGridCol }
export default McGridCol
