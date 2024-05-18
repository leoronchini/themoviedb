import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueLazyload from 'vue-lazyload';

const app = createApp(App);

app.use(router);
app.use(VueLazyload, {
  preLoad: 1.3,
  error: 'assets/image-error.png',
  loading: 'assets/loader.gif',
  attempt: 1,
});

app.mount('#app');
