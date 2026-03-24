import { defineAsyncComponent } from 'vue'

const McDrawerContainer = defineAsyncComponent(() => import('./McDrawerContainer.vue'))
export { McDrawerContainer }
export default McDrawerContainer
