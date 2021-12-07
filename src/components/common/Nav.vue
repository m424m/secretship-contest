<template>
  <nav class="nav">
    <router-link to="/" class="nav__app-name">
      <Secretship/>
      <span>Secretship App</span>
    </router-link>

    <div class="nav__user">
      <Dropdown>
        <template #toggle>
          <div class="nav__user-name">
            {{ user.telegram.first_name }} {{ user.telegram.last_name }}
            <ChevronDown/>
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
                <Edit/>
                <span>{{ $t('nav.edit') }}</span>
              </router-link>
            </li>
            <li>
              <router-link to="/help">
                <QuestionCircle/>
                <span>{{ $t('nav.help') }}</span>
              </router-link>
            </li>
            <li @click="logOut">
              <a>
                <LogOut/>
                <span>{{ $t('nav.log_out') }}</span>
              </a>
            </li>
          </ul>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import Secretship from '@/assets/icons/secretship.svg'
import ChevronDown from '@/assets/icons/chevron-down.svg'
import Edit from '@/assets/icons/edit.svg'
import QuestionCircle from '@/assets/icons/question-circle.svg'
import LogOut from '@/assets/icons/log-out.svg'
import { getUser, logOut } from '../../api'

export default {
  name: 'Nav',
  components: {
    Dropdown,
    Secretship,
    ChevronDown,
    Edit,
    QuestionCircle,
    LogOut,
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
@require '../../styles/vars.styl'

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
