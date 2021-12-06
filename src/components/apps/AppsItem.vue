<template>
  <router-link :to="`/apps/${app.id}`" class="app column">
    <div class="app__row">
      <div class="app__name">{{ app.name }}</div>
      <div class="app__balance">
        <span class="app__balance-ton">{{ app.balance }} <Ton/></span>
        <span class="app__balance-usd">${{ app.balance * 3 }}</span>
      </div>
    </div>
    <div class="app__row">
      <span class="app__created">{{ created }}</span>
    </div>
  </router-link>
</template>

<script>
import dayjs from 'dayjs'
import Ton from '@/assets/icons/ton.svg'

export default {
  name: 'AppsItem',
  components: { Ton },
  props: {
    app: {
      required: true,
    },
  },
  setup(props) {
    const created = dayjs(props.app.created)
      .format('MMM DD, YYYY')

    return {
      created,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../styles/vars.styl'

.app
  display flex
  flex-direction column
  gap 10px
  justify-content space-between
  border 1px solid rgba(0, 0, 0, .07)
  background-color white
  box-shadow: 0 1px 2px rgba(0, 0, 0, .07)
  border-radius 6px
  padding 20px
  color text
  text-decoration none

  &__row
    display flex
    justify-content space-between
    align-items flex-start
    gap 15px

  &__name
    font-weight 700

  &__balance
    display flex
    align-items center
    font-weight 500

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
