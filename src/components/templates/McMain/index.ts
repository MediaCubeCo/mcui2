import { defineAsyncComponent } from 'vue'

const McMain = defineAsyncComponent(() => import('./McMain.vue'))
export { McMain }
export default McMain
