import { createApp } from 'vue';
import { createPinia } from 'pinia';
import CustomScrollbar from 'custom-vue-scrollbar';

import 'custom-vue-scrollbar/dist/style.css';
import '@/assets/scss/theme.scss';
import '@/assets/scss/main.scss';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component(CustomScrollbar.name, CustomScrollbar);

app.use(createPinia())
app.use(router)

app.mount('#app')
