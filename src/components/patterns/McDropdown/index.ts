import { defineAsyncComponent } from 'vue'

const McDropdown = defineAsyncComponent(() => import('./McDropdown.vue'))
export { McDropdown }
const McDropdownPanel = defineAsyncComponent(() => import('./McDropdownPanel.vue'))
export { McDropdownPanel }
export default McDropdown
