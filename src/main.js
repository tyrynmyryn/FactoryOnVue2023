import { createApp } from 'vue'
import { createStore } from 'vuex'

import App from './App.vue'
import components from '@/components/UI/components'

import store from '@/store/store'

import './styles/style.scss'

const app = createApp(App)

app.use(createStore(store))

components.forEach((component) => {
    app.component(component.name, component)
})

app.mount('#app');

