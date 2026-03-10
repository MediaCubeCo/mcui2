import { defineAsyncComponent } from 'vue'

const McTableCardHeader = defineAsyncComponent(() => import('./McTableCardHeader.vue'))
export { McTableCardHeader }
export default McTableCardHeader
