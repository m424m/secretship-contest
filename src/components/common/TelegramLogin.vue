<template>
  <div class="login">
    <component :is="'script'" src="https://telegram.org/js/telegram-widget.js?15"
               data-telegram-login="chtqqrwet_bot" data-size="large"
               data-auth-url="https://google.com"/>
    <component :is="'script'">
      function onTgAuth(user) {
      alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id +
      (user.username ? ', @' + user.username : '') + ')');
      }
    </component>
    <button class="login__facade">Log in</button>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted } from 'vue';

export default {
  name: 'TelegramLogin',
  setup() {
    onMounted(() => {
      window.onTelegramAuth = (data) => {
        console.log(data);
      };
    });
    onBeforeUnmount(() => {
      window.onTelegramAuth = null;
    });
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
