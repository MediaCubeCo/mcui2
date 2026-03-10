import { defineAsyncComponent } from 'vue'

const McSpinNumber = defineAsyncComponent(() => import('./McSpinNumber.vue'))
export { McSpinNumber }
export default McSpinNumber
