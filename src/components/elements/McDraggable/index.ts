import { defineAsyncComponent } from 'vue'

const McDraggable = defineAsyncComponent(() => import('./McDraggable.vue'))
export { McDraggable }
export default McDraggable
