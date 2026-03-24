import { defineAsyncComponent } from 'vue'
const McModal = defineAsyncComponent(() => import('./McModal.vue'))
export { McModal }
export default McModal
