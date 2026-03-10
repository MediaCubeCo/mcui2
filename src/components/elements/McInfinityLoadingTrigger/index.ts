import { defineAsyncComponent } from 'vue'

const McInfinityLoadingTrigger = defineAsyncComponent(() => import('./McInfinityLoadingTrigger.vue'))
export { McInfinityLoadingTrigger }
export default McInfinityLoadingTrigger
