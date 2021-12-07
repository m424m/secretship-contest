import { createMetaManager } from 'vue-meta'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import strings from './i18n.yaml'
import ClickOutside from './plugins/v-click-outside'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.config.devtools = true

app.use(ClickOutside)

app.use(createI18n({
  locale: 'en',
  messages: strings,
}))

app.use(createMetaManager())

app.use(store)
  .use(router)
  .mount('#app')
