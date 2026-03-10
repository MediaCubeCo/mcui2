import { defineAsyncComponent } from 'vue'

const McTabs = defineAsyncComponent(() => import('./McTabs.vue'))
export { McTabs }
export default McTabs
