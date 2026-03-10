import { defineAsyncComponent } from 'vue'

const McFilterTags = defineAsyncComponent(() => import('./McFilterTags.vue'))
export { McFilterTags }
export default McFilterTags
