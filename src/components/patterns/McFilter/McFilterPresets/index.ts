import { defineAsyncComponent } from 'vue'

const McFilterPresets = defineAsyncComponent(() => import('./McFilterPresets.vue'))
export { McFilterPresets }
export default McFilterPresets
