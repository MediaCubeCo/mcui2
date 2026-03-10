import { defineAsyncComponent } from 'vue'

const McFieldText = defineAsyncComponent(() => import('./McFieldText.vue'))
export { McFieldText }
export default McFieldText
