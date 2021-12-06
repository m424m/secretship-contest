import InlineSvg from 'vue-inline-svg'
import { createI18n } from 'vue-i18n'
import strings from './i18n.yaml'
import ClickOutside from './plugins/v-click-outside'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.config.devtools = true

app.component('inline-svg', InlineSvg)
app.use(ClickOutside)

app.use(createI18n({
  locale: 'en',
  messages: strings,
}))

app.use(store)
  .use(router)
  .mount('#app')
