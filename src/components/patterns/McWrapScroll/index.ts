import { defineAsyncComponent } from 'vue'

const McWrapScroll = defineAsyncComponent(() => import('./McWrapScroll.vue'))
export { McWrapScroll }
export default McWrapScroll
