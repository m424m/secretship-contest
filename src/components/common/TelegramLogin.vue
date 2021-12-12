<template>
  <div class="login">
    <div class="login__iframe" ref="iframe"/>
    <button class="login__facade" :disabled="!isLoaded">Log in</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setUserTelegramData } from '@/api'

const router = useRouter()
const botUsername = process.env.VITE_BOT_USERNAME
const isLoaded = ref(false)
const iframe = ref(null)

const onLoad = () => {
  isLoaded.value = true
}

const onLogin = (user) => {
  setUserTelegramData(user)
  router.push('/apps')
  window.onTelegramAuth = null
}

onMounted(() => {
  const el = document.createElement('script')
  el.src = 'https://telegram.org/js/telegram-widget.js?15'
  el.dataset.telegramLogin = botUsername
  el.dataset.size = 'large'
  window.onTelegramAuth = onLogin
  el.dataset.onauth = 'onTelegramAuth(user)'
  el.onload = onLoad

  iframe.value.appendChild(el)
})
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
    background-color $accent-hover
</style>
