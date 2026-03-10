import { defineAsyncComponent } from 'vue'

const McFieldCheckbox = defineAsyncComponent(() => import('./McFieldCheckbox.vue'))
export { McFieldCheckbox }
export default McFieldCheckbox
