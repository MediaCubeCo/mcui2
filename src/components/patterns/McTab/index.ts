import { defineAsyncComponent } from 'vue'

const McTab = defineAsyncComponent(() => import('./McTab.vue'))
export { McTab }
export default McTab
