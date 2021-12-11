import { createMetaManager } from 'vue-meta'
import { createApp } from 'vue'
import createI18n from './i18n'
import ClickOutside from './plugins/v-click-outside'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.config.devtools = true

app
  .use(ClickOutside)
  .use(createI18n)
  .use(createMetaManager())
  .use(store)
  .use(router)
  .mount('#app')
