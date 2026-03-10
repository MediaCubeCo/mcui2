import { defineAsyncComponent } from 'vue'

const McSideBar = defineAsyncComponent(() => import('./McSideBar.vue'))
export { McSideBar }
export default McSideBar
