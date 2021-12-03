<template>
  <nav class="nav">
    <router-link to="/" class="nav__app-name">Cool App</router-link>

    <div class="nav__user">
      <Dropdown>
        <template #toggle>
          <div class="nav__user-name">
            {{ user?.telegram?.first_name }} {{ user?.telegram?.last_name }}
            <Icon name="chevron-down"/>
            <div class="nav__user-avatar">
              <img
              :src="user?.telegram?.photo_url" alt="">
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
                <Icon name="question-mark"/>
                <span>Help</span>
              </router-link>
            </li>
            <li @click="logOut">
              <Icon name="log-out"/>
              <span>Log out</span>
            </li>
          </ul>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<script>
import Icon from '@/components/common/Icon.vue';
import Dropdown from '@/components/common/Dropdown.vue';
import { getUser, logOut } from '../../api';

export default {
  name: 'Nav',
  components: {
    Dropdown,
    Icon,
  },
  methods: {
    logOut,
  },
  computed: {
    user() {
      return getUser();
    },
  },
};
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
      display block
      border-radius 50%
      width 36px
      height 36px
      margin-left 18px
      position relative
      overflow hidden
      background-color #e6e6e6

      img
        position absolute
        top 0
        left 0
        width 100%
</style>
