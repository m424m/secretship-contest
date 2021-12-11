<template>
  <div class="dropdown" v-click-outside="close">
    <button class="plain" @click="isOpen = !isOpen">
      <slot name="toggle"></slot>
    </button>
    <div class="dropdown__menu" v-if="$slots.menu" v-show="isOpen">
      <slot name="menu" class="dropdown__menu"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const close = () => {
  isOpen.value = false
}

const route = useRoute()
watch(() => route.fullPath, close)
</script>

<style lang="stylus" scoped>
.dropdown
  position relative

  &__menu
    position absolute
    top calc(100% + 5px)
    right -1px
    border 1px solid rgba(0, 0, 0, .07)
    background-color white
    box-shadow: 0 1px 2px rgba(0, 0, 0, .07)
    border-radius: 4px
    padding 5px 0
    min-width: 230px
    max-width: 280px
    z-index 10

    ::v-deep(ul)
      padding 0
      margin 0
      list-style none

      li
        min-height 36px
        cursor pointer
        font-size 13px
        font-weight 500
        display flex
        align-items center

        &::before
          content none

        a
          display flex
          align-items center
          color currentColor
          text-decoration none
          width 100%
          padding 6px 15px

        svg
          width 24px
          height 24px
          color #979797
          margin-right 15px

        &:hover
          background-color #f4f4f4
</style>
