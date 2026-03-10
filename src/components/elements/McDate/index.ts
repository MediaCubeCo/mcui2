import { defineAsyncComponent } from 'vue'

const McDate = defineAsyncComponent(() => import('./McDate.vue'))
export { McDate }
export default McDate
