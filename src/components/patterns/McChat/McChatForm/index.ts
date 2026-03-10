import { defineAsyncComponent } from 'vue'

const McChatForm = defineAsyncComponent(() => import('./McChatForm.vue'))
export { McChatForm }
export default McChatForm
