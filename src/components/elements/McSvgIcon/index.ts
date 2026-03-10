import { defineAsyncComponent } from 'vue'

const McSvgIcon = defineAsyncComponent(() => import('./McSvgIcon.vue'))
export { McSvgIcon }
export default McSvgIcon
