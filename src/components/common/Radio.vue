<template>
  <label class="input__wrapper radio">
    <input type="radio" :name="name" :checked="modelValue === value" class="radio__input"
           @change="onChange">
    <span class="radio__facade">
      <span class="radio__ripple" ref="rippleMask">
        <span class="radio__ripple-inner" :style="rippleStyle" ref="ripple"/>
      </span>
      <span class="radio__check" @mousedown="onMouseDown" @mouseup="onMouseUp"/>
    </span>
    <span class="radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { ref, toRefs } from 'vue'

export default {
  name: 'Radio',
  props: {
    modelValue: null,
    value: null,
    disabled: Boolean,
    name: String,
  },
  setup(props, { emit }) {
    const {
      value,
    } = toRefs(props)
    const rippleStyle = ref({})
    const rippleMask = ref(null)

    const onChange = () => {
      emit('update:modelValue', value)
    }

    const onMouseDown = (e) => {
      const rect = rippleMask.value.getBoundingClientRect()
      let clientX
      let clientY
      if (e.type === 'touchstart') {
        clientX = e.targetTouches[0].clientX
        clientY = e.targetTouches[0].clientY
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }
      const rippleX = (clientX - rect.left) - rippleMask.value.offsetWidth / 2
      const rippleY = (clientY - rect.top) - rippleMask.value.offsetHeight / 2
      rippleStyle.value.transition = 'none'
      rippleStyle.value.transform = `translate3d(${rippleX}px, ${rippleY}px, 0) scale3d(0.2, 0.2, 1)`
      rippleStyle.value.opacity = 1
      setTimeout(() => {
        rippleStyle.value.transform = `translate3d(${rippleX}px, ${rippleY}px, 0) scale3d(1, 1, 1)`
        rippleStyle.value.transition = ''
      }, 0)
    }

    const onMouseUp = () => {
      rippleStyle.value.opacity = '0'
    }

    return {
      rippleMask,
      rippleStyle,
      onChange,
      onMouseDown,
      onMouseUp,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/vars.styl'

.radio
  font-size 14px
  line-height 20px
  display flex

  .radio-group &
    margin-bottom 0
    margin-top 18px

    @media desktop
      padding-left 15px

  &__input
    position absolute
    left -9999px
    visibility hidden

  &__facade
    position relative
    margin-top 1px

  &__check
    display block
    width 20px
    height 20px
    border 2px solid #b3b3b3
    border-radius 50%
    position relative
    transition all .2s ease
    cursor pointer

    &::before
      content ''
      position absolute
      width 10px
      height 10px
      top 50%
      left 50%
      transform translate(-50%, -50%) scale(0)
      border-radius 50%
      background-color #b3b3b3
      transition all .2s ease

  :checked + &__facade &__check
    border-color accent

    &::before
      transform translate(-50%, -50%)
      background-color accent

  &__ripple
    display block
    width 32px
    height 32px
    position absolute
    left -6px
    top -6px
    border-radius 50%
    overflow hidden
    pointer-events none

    &-inner
      position absolute
      width 80px
      height 80px
      left -24px
      top -24px
      border-radius 50%
      opacity 0
      background-color rgba(179, 179, 179, .2)
      transition transform .65s ease-out, opacity .65s ease-out, background-color .65s ease-out

  &__input:checked + &__facade &__ripple-inner
    background-color rgba(84, 169, 235, .2)

  &__label
    display inline-block
    margin-left 10px
    user-select none
    max-width calc(100% - 31px)
</style>
