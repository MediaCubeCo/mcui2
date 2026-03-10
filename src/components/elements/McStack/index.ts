import { defineAsyncComponent } from 'vue'

const McStack = defineAsyncComponent(() => import('./McStack.vue'))
export { McStack }
export default McStack
