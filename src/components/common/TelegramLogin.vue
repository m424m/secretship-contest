<template>
  <div class="login">
    <telegram-login-temp
      class="login__iframe"
      mode="callback"
      :telegram-login="botUsername"
      @loaded="onLoad"
      @callback="onLogin"/>
    <button class="login__facade" :disabled="!isLoaded">Log in</button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { telegramLoginTemp } from 'vue3-telegram-login'
import { setUserTelegramData } from '../../api'

export default {
  name: 'TelegramLogin',
  components: { telegramLoginTemp },
  setup() {
    const router = useRouter()
    const isLoaded = ref(false)

    const botUsername = process.env.VITE_BOT_USERNAME

    const onLoad = () => {
      isLoaded.value = true
    }
    const onLogin = (result) => {
      setUserTelegramData(result)
      router.push('/apps')
    }

    return {
      isLoaded,
      botUsername,
      onLoad,
      onLogin,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.login
  width 210px
  height 46px
  margin auto
  overflow hidden
  position relative
  border-radius 6px

  &__iframe
    border-radius 6px
    overflow hidden
    height 100%

  ::v-deep(iframe)
    display block
    transform scale(8)
    transform-origin 10% 30%
    border-radius 6px

  &__facade
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    pointer-events none

  &:hover &__facade
    background-color accent-hover
</style>
