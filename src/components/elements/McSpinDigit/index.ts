import { defineAsyncComponent } from 'vue'

const McSpinDigit = defineAsyncComponent(() => import('./McSpinDigit.vue'))
export { McSpinDigit }
export default McSpinDigit
