import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const pinia = createPinia();
const app = createApp(App);
//app.use(bootstrapVue);
app.use(pinia);
app.use(router);
app.mount('#app'); 


