import { defineAsyncComponent } from 'vue'

const McDrawer = defineAsyncComponent(() => import('./McDrawer.vue'))
export { McDrawer }
export default McDrawer
