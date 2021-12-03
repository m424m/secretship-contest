<template>
  <div class="account">
    <div class="account__avatar">
      <img
        :src="user.telegram.photo_url" alt=""/>
    </div>
    <div class="account__info">
      <div class="account__name">{{ user.telegram.first_name }} {{user.telegram.last_name}}</div>
      <div class="account__type">Personal account</div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api';

export default {
  name: 'AccountPreview',
  computed: {
    user() {
      return getUser();
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@/styles/vars.styl'

.account
  display flex
  align-items center
  border 2px solid accent
  border-radius 6px
  padding 12px
  gap 15px

  &__avatar
    display block
    width 44px
    height 44px
    border-radius 50%
    position relative
    background-color #e6e6e6
    overflow hidden

    img
      position absolute
      top 0
      left 0
      width 100%

  &__name
    font-size 15px
    font-weight 500

  &__type
    font-size 13px
    color text-secondary
    margin-top 2px
</style>
