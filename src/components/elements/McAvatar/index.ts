import { defineAsyncComponent } from 'vue'

const McAvatar = defineAsyncComponent(() => import('./McAvatar.vue'))
export { McAvatar }
export default McAvatar
