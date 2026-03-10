import { defineAsyncComponent } from 'vue'

const McContentFixed = defineAsyncComponent(() => import('./McContentFixed.vue'))
export { McContentFixed }
export default McContentFixed
