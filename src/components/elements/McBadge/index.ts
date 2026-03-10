import { defineAsyncComponent } from 'vue'

const McBadge = defineAsyncComponent(() => import('./McBadge.vue'))
export { McBadge }
export default McBadge
