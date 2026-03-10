import { defineAsyncComponent } from 'vue'

const McCropper = defineAsyncComponent(() => import('./McCropper.vue'))
export { McCropper }
export default McCropper
