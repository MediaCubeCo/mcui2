import { defineAsyncComponent } from 'vue'

const McBottomLoader = defineAsyncComponent(() => import('./McBottomLoader.vue'))
export { McBottomLoader }
export default McBottomLoader
