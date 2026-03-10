import { defineAsyncComponent } from 'vue'

const McNoData = defineAsyncComponent(() => import('./McNoData.vue'))
export { McNoData }
export default McNoData
