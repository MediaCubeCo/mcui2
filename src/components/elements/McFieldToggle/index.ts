import { defineAsyncComponent } from 'vue'

const McFieldToggle = defineAsyncComponent(() => import('./McFieldToggle.vue'))
export { McFieldToggle }
export default McFieldToggle
