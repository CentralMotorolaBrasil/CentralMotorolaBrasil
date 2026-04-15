import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/main.css'

const animationsEnabled = JSON.parse(localStorage.getItem('animationsEnabled') ?? 'true')
if (!animationsEnabled) {
  document.documentElement.classList.add('no-animations')
}

const app = createApp(App)
app.use(router)
app.mount('#app')