import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'

const asd = defineAsyncComponent(() => import('@/components/asd.vue'))

const app = createApp(App)

import ui from './index'
app.use(ui, {
  modalComponents: {
    asd,
  }
})

app.mount('#app')
