import './assets/main.scss'

import MIcon from '@/components/MIcon/MIcon.vue'
import MText from '@/components/MText/MText.vue'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('MIcon', MIcon)
app.component('MText', MText)
app.use(router)

app.mount('#app')
