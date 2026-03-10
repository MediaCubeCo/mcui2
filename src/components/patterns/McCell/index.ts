import { defineAsyncComponent } from 'vue'

const McCell = defineAsyncComponent(() => import('./McCell.vue'))
export { McCell }
export default McCell
