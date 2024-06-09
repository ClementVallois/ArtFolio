import '@/assets/css/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router'
import { auth0 } from './domain/authentification'
import dotenv from 'dotenv';
dotenv.config();


const app = createApp(App)
app.use(auth0)
app.use(router)
app.use(createPinia())
app.mount('#app')
