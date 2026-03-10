import { defineAsyncComponent } from 'vue'

const McTableSort = defineAsyncComponent(() => import('./McTableSort.vue'))
export { McTableSort }
export default McTableSort
