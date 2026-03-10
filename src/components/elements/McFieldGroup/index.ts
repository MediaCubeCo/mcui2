import { defineAsyncComponent } from 'vue'

const McFieldGroup = defineAsyncComponent(() => import('./McFieldGroup.vue'))
export { McFieldGroup }
export default McFieldGroup
