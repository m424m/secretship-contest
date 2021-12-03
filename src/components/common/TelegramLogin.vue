<template>
  <div class="login">
    <component :is="'script'" src="https://telegram.org/js/telegram-widget.js?15"
               data-telegram-login="samplebot" data-size="large"
               data-onauth="onTelegramAuth"
               data-request-access="write"/>
    <button class="login__facade">Log in</button>
  </div>
</template>

<script>
export default {
  name: 'TelegramLogin',
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

    &:active
      pointer-events none
</style>
