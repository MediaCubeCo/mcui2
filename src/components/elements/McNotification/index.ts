import { defineAsyncComponent } from 'vue'

const McNotification = defineAsyncComponent(() => import('./McNotification.vue'))
export { McNotification }
export default McNotification
