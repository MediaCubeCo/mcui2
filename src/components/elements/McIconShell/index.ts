import { defineAsyncComponent } from 'vue'

const McIconShell = defineAsyncComponent(() => import('./McIconShell.vue'))
export { McIconShell }
export default McIconShell
