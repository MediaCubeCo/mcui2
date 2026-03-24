import { defineAsyncComponent } from 'vue'
const McModalContainer = defineAsyncComponent(() => import('./McModalContainer.vue'))
export { McModalContainer }
export default McModalContainer
