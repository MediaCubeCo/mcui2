import { defineAsyncComponent } from 'vue'

const McTableCard = defineAsyncComponent(() => import('./McTableCard.vue'))
export { McTableCard }
export default McTableCard
