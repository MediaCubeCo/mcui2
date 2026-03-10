import { defineAsyncComponent } from 'vue'

const McDatepicker = defineAsyncComponent(() => import('./McDatepicker.vue'))
export { McDatepicker }
export default McDatepicker
