import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.scss'
import './assets/fonts/inter/inter.css'
import ui from './index'

const app = createApp(App)
app.use(ui)

app.mount('#app')
