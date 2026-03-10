import { defineAsyncComponent } from 'vue'

const McChat = defineAsyncComponent(() => import('./McChat.vue'))
export { McChat }
export default McChat
