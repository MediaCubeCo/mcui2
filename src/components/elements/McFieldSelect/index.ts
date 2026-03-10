import { defineAsyncComponent } from 'vue'

const McFieldSelect = defineAsyncComponent(() => import('./McFieldSelect.vue'))
export { McFieldSelect }
export default McFieldSelect
