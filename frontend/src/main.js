import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/store'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"




const app = createApp(App).use(store)

app.use(router);
app.use(store);
app.mount('#app');