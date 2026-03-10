import { defineAsyncComponent } from 'vue'

const McVirtualScroll = defineAsyncComponent(() => import('./McVirtualScroll.vue'))
export { McVirtualScroll }
export default McVirtualScroll
