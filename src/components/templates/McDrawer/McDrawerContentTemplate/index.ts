import { defineAsyncComponent } from 'vue'

const McDrawerContentTemplate = defineAsyncComponent(() => import('./McDrawerContentTemplate.vue'))
export { McDrawerContentTemplate }
export default McDrawerContentTemplate
