import { defineAsyncComponent } from 'vue'
const McModalContainer = defineAsyncComponent(() => import('./McModalContainer.vue'))
export { McModalContainer }
const McModal = defineAsyncComponent(() => import('./McModal.vue'))
export { McModal }
export default McModalContainer
