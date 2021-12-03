<template>
  <div class="account">
    <img src="https://cdn4.telesco.pe/file/WOEYrzgyJupTbfQSSBbYZ-gl-XJDaNLdd0of-MzMhqT3mmKHU582-TVdvNI84U4ogVYZf-Knd98JWNwIbbrZ7qfsnYPYsS0-sP_HBIH9n2SPP_o-Lr0S60xBxIaZ6DiDY1OFG8bQBXLfGdMi6kTglU2KD9xYqDBlLNc_PgWxuhibHxbtpAGkusJNJsXX-k-N4lQTu0Tapn2V8lHwx4mV6i8PzyTPJsOxc7w_M1BrceFzOpEIc6tVa0jK67tbm6AELyrpWYwIJAn2iBz_hTGNwc8s1SitU9H9ju50ifp2Y6PQ0noVjhGlNXRbSMOwtMWYZcdIfeY8UvSBhedzOqbo_Q.jpg"
    class="account__avatar" alt="A · M"/>
    <div class="account__info">
      <div class="account__name">A · M</div>
      <div class="account__type">Personal account</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountPreview',
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
