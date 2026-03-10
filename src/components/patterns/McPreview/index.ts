import { defineAsyncComponent } from 'vue'

const McPreview = defineAsyncComponent(() => import('./McPreview.vue'))
export { McPreview }
export default McPreview
