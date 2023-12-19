import { createApp } from 'vue'
import router from './router'

import { createPinia } from 'pinia'

import 'bootstrap'

import App from './App.vue'

// firebase
import '@/firebase/googleLogin.js'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
