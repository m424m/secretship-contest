<template>
  <nav class="nav">
    <router-link to="/" class="nav__app-name">Cool App</router-link>

    <div class="nav__user">
      <Dropdown>
        <template #toggle>
          <span class="nav__user-name">A · M
            <Icon name="chevron-down"/>
            <img
              src="https://cdn4.telesco.pe/file/WOEYrzgyJupTbfQSSBbYZ-gl-XJDaNLdd0of-MzMhqT3mmKHU582-TVdvNI84U4ogVYZf-Knd98JWNwIbbrZ7qfsnYPYsS0-sP_HBIH9n2SPP_o-Lr0S60xBxIaZ6DiDY1OFG8bQBXLfGdMi6kTglU2KD9xYqDBlLNc_PgWxuhibHxbtpAGkusJNJsXX-k-N4lQTu0Tapn2V8lHwx4mV6i8PzyTPJsOxc7w_M1BrceFzOpEIc6tVa0jK67tbm6AELyrpWYwIJAn2iBz_hTGNwc8s1SitU9H9ju50ifp2Y6PQ0noVjhGlNXRbSMOwtMWYZcdIfeY8UvSBhedzOqbo_Q.jpg"
              class="nav__user-avatar" alt="A · M">
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

export default {
  name: 'Nav',
  components: {
    Dropdown,
    Icon,
  },
  computed: {
    breadcrumbs() {
      return [
        {
          name: 'Telegram Ads',
          url: '/',
        },
      ];
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
