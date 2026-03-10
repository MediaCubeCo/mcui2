import { defineAsyncComponent } from 'vue'

const McToast = defineAsyncComponent(() => import('./McToast.vue'))
export { McToast }
export default McToast
