import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import mitt from 'mitt'
import './assets/tailwind.css'
const emitter = mitt()

const app = createApp(App)
app.config.globalProperties.$emitter = emitter
app.use(store).use(router).mount('#app')
