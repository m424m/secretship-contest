<template>
  <nav class="nav">
    <router-link to="/" class="nav__app-name">Cool App</router-link>

    <div class="nav__user">
      <Dropdown>
        <template #toggle>
          <span class="nav__user-name">
            {{user.telegram.full_name}}
            <Icon name="chevron-down"/>
            <img
              :src="user.telegram.photo_url"
              class="nav__user-avatar" :alt="user.telegram.full_name">
          </span>
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
            <li>
              <router-link to="/">
                <Icon name="log-out"/>
                <span>Log out</span>
              </router-link>
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
import { getUser } from '../../api';

export default {
  name: 'Nav',
  components: {
    Dropdown,
    Icon,
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
</style>
