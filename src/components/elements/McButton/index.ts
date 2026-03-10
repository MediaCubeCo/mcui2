import { defineAsyncComponent } from 'vue'

const McButton = defineAsyncComponent(() => import('./McButton.vue'))
export { McButton }
export default McButton
