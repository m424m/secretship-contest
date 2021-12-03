<template>
  <div class="login">
    <telegram-login-temp
      mode="callback"
      telegram-login="chtqqrwet_bot"
      @loaded="onLoad"
      @callback="onLogin"/>
    <button class="login__facade" :disabled="!isLoaded">Log in</button>
  </div>
</template>

<script>
import { telegramLoginTemp } from 'vue3-telegram-login';
import { setUserData } from '../../api';

export default {
  name: 'TelegramLogin',
  components: { telegramLoginTemp },
  data() {
    return {
      isLoaded: false,
    };
  },
  methods: {
    onLoad() {
      this.isLoaded = true;
    },
    onLogin(data) {
      console.log(data);
      setUserData(data)
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "~@/styles/vars.styl"

.login
  width 210px
  height 46px
  margin auto
  overflow hidden
  position relative
  border-radius 6px

  ::v-deep(iframe)
    display block
    transform scale(10)
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
