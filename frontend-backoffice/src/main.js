import './assets/css/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css';
import { auth0 } from './domain/auth0'


const app = createApp(App)
//AUTH0 REACTIVATE
app.use(auth0)
app.use(router)
app.use(createPinia())
app.mount('#app')