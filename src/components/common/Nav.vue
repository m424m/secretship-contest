<template>
  <nav class="nav">
    <router-link to="/" class="nav__app-name">
      <Icon name="secretship"/>
      <span>Secretship App</span>
    </router-link>

    <div class="nav__user">
      <Dropdown>
        <template #toggle>
          <div class="nav__user-name">
            {{ user.telegram.first_name }} {{ user.telegram.last_name }}
            <Icon name="chevron-down"/>
            <div class="nav__user-avatar">
              <img
                :src="user.telegram.photo_url" alt="" v-if="user.telegram.photo_url">
              <span v-else>{{ user.telegram.first_name[0] }}</span>
            </div>
          </div>
        </template>

        <template #menu>
          <ul>
            <li>
              <router-link to="/account/edit">
                <Icon name="edit"/>
                <span>Edit Account Info</span>
              </router-link>
            </li>
            <li>
              <router-link to="/help">
                <Icon name="question-circle"/>
                <span>Help</span>
              </router-link>
            </li>
            <li @click="logOut">
              <a>
                <Icon name="log-out"/>
                <span>Log out</span>
              </a>
            </li>
          </ul>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<script>
import Icon from '@/components/common/Icon.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import { getUser, logOut } from '../../api'

export default {
  name: 'Nav',
  components: {
    Dropdown,
    Icon,
  },
  setup() {
    const user = getUser()

    return {
      user,
      logOut,
    }
  },
}
</script>

<style lang="stylus" scoped>
@require '~@/styles/vars.styl'

.nav
  padding 14px 15px
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid #e6e6e6

  @media desktop
    padding 14px 0

  &__app-name
    padding 10px 0
    font-weight 500
    display flex
    align-items center
    gap 10px

    svg
      display block
      height 19px
      color accent-dark

  &__user
    &-name
      display flex
      align-items center
      font-size 14px
      color link
      font-weight 500

      svg
        display inline-block
        width 13px
        margin-left 5px

    &-avatar
      display flex
      justify-content center
      align-items center
      border-radius 50%
      width 36px
      height 36px
      margin-left 18px
      position relative
      overflow hidden
      background-color #efefef
      color #999
      font-size 16px
      text-transform uppercase

      img
        position absolute
        top 0
        left 0
        width 100%

      span
        user-select none
</style>
