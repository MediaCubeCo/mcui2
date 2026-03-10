import { defineAsyncComponent } from 'vue'

const McSideBarCenter = defineAsyncComponent(() => import('./McSideBarCenter.vue'))
export { McSideBarCenter }
export default McSideBarCenter
