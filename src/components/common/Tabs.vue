<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.tabs
  margin-bottom 30px

  ::v-deep(a)
    display inline-block
    width fit-content
    font-size 14px
    line-height 16px
    font-weight 500
    padding 7px 15px
    border-radius 16px
    text-decoration none
    margin-right 5px
    transition all .2s ease

    &:hover
      background-color #f0f6fa

    &.router-link-exact-active
      background-color $accent-dark
      color white
</style>
