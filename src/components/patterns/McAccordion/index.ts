import { defineAsyncComponent } from 'vue'

const McAccordion = defineAsyncComponent(() => import('./McAccordion.vue'))
export { McAccordion }
export default McAccordion
