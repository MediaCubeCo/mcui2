import { defineAsyncComponent } from 'vue'

const McTableSkeletonLoading = defineAsyncComponent(() => import('./McTableSkeletonLoading.vue'))
export { McTableSkeletonLoading }
export default McTableSkeletonLoading
