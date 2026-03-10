import { defineAsyncComponent } from 'vue'

const McSlideUpDown = defineAsyncComponent(() => import('./McSlideUpDown.vue'))
export { McSlideUpDown }
export default McSlideUpDown
