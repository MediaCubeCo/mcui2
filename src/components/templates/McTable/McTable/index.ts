import { defineAsyncComponent } from 'vue'

const McTable = defineAsyncComponent(() => import('./McTable.vue'))
export { McTable }
export default McTable
