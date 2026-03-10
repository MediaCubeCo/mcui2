import { defineAsyncComponent } from 'vue'

const McTitle = defineAsyncComponent(() => import('./McTitle.vue'))
export { McTitle }
export default McTitle
