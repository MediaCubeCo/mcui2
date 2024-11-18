import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.scss'
import './assets/fonts/inter/inter.css'
import router from './router.js'

const app = createApp(App)
app.use(router)

app.mount('#app')
