import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

Axios.defaults.baseURL = 'http://localhost:8080/api';
Axios.defaults.headers.common['apiKey'] = '2134-3242-2132-6576';

app.use(VueAxios, Axios);
app.use(createPinia())
app.use(router)

app.mount('#app');
