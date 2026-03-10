import { defineAsyncComponent } from 'vue'

const McSideBarTop = defineAsyncComponent(() => import('./McSideBarTop.vue'))
export { McSideBarTop }
export default McSideBarTop
