import { defineAsyncComponent } from 'vue'

const McDrawer = defineAsyncComponent(() => import('./McDrawer.vue'))
export { McDrawer }
const McDrawerContainer = defineAsyncComponent(() => import('./McDrawerContainer.vue'))
export { McDrawerContainer }
export default McDrawer
