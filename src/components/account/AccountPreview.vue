<template>
  <div class="account">
    <div class="account__avatar">
      <img
        :src="user.telegram.photo_url" alt="" v-if="user.telegram.photo_url"/>
      <span v-else>{{ user.telegram.first_name[0] }}</span>
    </div>
    <div class="account__info">
      <div class="account__name">{{ user.telegram.first_name }} {{ user.telegram.last_name }}</div>
      <div class="account__type">Personal account</div>
    </div>
  </div>
</template>

<script setup>
import { getUser } from '@/api'

const user = getUser()
</script>

<style lang="stylus" scoped>
@import '../../styles/vars.styl'

.account
  display flex
  align-items center
  border 2px solid $accent
  border-radius 6px
  padding 12px
  gap 15px

  &__avatar
    display flex
    justify-content center
    align-items center
    width 44px
    height 44px
    border-radius 50%
    position relative
    background-color #efefef
    overflow hidden
    color #999
    font-size 20px
    text-transform uppercase

    img
      position absolute
      top 0
      left 0
      width 100%

    span
      user-select none

  &__name
    font-size 15px
    font-weight 500

  &__type
    font-size 13px
    color $text-secondary
    margin-top 2px
</style>
