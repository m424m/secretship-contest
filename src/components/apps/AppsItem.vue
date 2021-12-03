<template>
  <router-link :to="`/apps/${app.id}`" class="app">
    <div class="app__row">
      <div class="app__name">{{app.name}}</div>
      <div class="app__balance">
        <span class="app__balance-ton">100 <Icon name="ton"/></span>
        <span class="app__balance-usd">$300</span>
      </div>
    </div>
    <div class="app__row">
      <span class="app__created">Dec 04, 2021</span>
    </div>
  </router-link>
</template>

<script>
import Icon from '../common/Icon.vue';

export default {
  name: 'AppsItem',
  components: { Icon },
  props: {
    app: {
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/styles/vars.styl'

.app
  display flex
  flex-direction column
  gap 10px
  border 1px solid rgba(0, 0, 0, .07);
  background-color white
  box-shadow: 0 1px 2px rgba(0, 0, 0, .07);
  border-radius 6px
  padding 20px
  color text
  text-decoration none

  &__row
    display flex
    justify-content space-between
    align-items center

  &__name
    font-weight 700

  &__balance
    display flex
    align-items center
    color #dcdcdc
    font-weight 500

    &-ton
      color text
      display flex
      align-items center
      gap 6px

    &-usd
      font-size 14px
      color text-secondary

      &::before
        content '/'
        color #dcdcdc
        margin 0 5px

  &__created
    color text-secondary
    font-size 14px
</style>
