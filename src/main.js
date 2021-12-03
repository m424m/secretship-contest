import InlineSvg from 'vue-inline-svg';
import { createApp } from 'vue';
import ClickOutside from './plugins/v-click-outside';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App)

app.config.devtools = true

app.component('inline-svg', InlineSvg)
app.use(ClickOutside)

app.use(store).use(router).mount('#app');
