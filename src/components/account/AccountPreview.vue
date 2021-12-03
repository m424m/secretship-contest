<template>
  <div class="account">
    <img
      :src="user.telegram.photo_url"
      class="account__avatar" :alt="user.telegram.first_name"/>
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
  padding 12px 15px
  gap 15px

  &__avatar
    display block
    width 44px
    height 44px
    border-radius 50%

  &__name
    font-size 15px
    font-weight 500

  &__type
    font-size 13px
    color #808080
    margin-top 2px
</style>
