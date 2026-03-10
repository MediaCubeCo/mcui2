import { defineAsyncComponent } from 'vue'

const McChatComment = defineAsyncComponent(() => import('./McChatComment.vue'))
export { McChatComment }
export default McChatComment
