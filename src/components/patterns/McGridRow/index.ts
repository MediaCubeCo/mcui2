import { defineAsyncComponent } from 'vue'

const McGridRow = defineAsyncComponent(() => import('./McGridRow.vue'))
export { McGridRow }
export default McGridRow
