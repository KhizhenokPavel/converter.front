import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Axios from 'axios';
import VueAxios from 'vue-axios';

const app = createApp(App);

Axios.defaults.baseURL = 'http://178.172.161.47:8080/api';

app.use(VueAxios, Axios);
app.use(createPinia())
app.use(router)

app.mount('#app');
