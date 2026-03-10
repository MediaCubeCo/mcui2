import { defineAsyncComponent } from 'vue'

const McSideBarButton = defineAsyncComponent(() => import('./McSideBarButton.vue'))
export { McSideBarButton }
export default McSideBarButton
