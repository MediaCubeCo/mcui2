import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import ui from './index'
app.use(ui)

app.mount('#app')
