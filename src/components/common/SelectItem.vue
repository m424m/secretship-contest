<template>
  <div :class="['select-item', {'with-image': !!image}]">
    <img :src="image" class="select-item__image" v-if="image" alt=""/>
    <slot/>
    <button type="button" class="select-item__remove plain"
            @click.prevent.stop="$emit('remove')" tabindex="-1">
      <Icon name="x"/>
    </button>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  name: 'SelectItem',
  components: { Icon },
  props: {
    image: String,
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/styles/vars.styl"

.select-item
  display inline-flex
  align-items center
  gap 6px
  font-size 12px
  line-height 16px
  font-weight 600
  -webkit-font-smoothing antialiased
  background-color accent
  border-radius 4px
  margin 3px 6px 3px 0
  padding 5px 9px
  padding-right 8px
  color #fff
  white-space nowrap

  &.with-image
    padding 0
    padding-right 8px

  &__image
    width 26px
    height 26px
    border-radius 4px
    margin-right 2px

  &__remove
    padding 0
    color white
    margin 0

    svg
      width 12px
      height 12px
</style>
