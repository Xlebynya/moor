import './assets/main.scss'

import MIcon from './components/MIcon/MIcon.vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('MIcon', MIcon)
app.use(router)

app.mount('#app')
