<template>
  <label class="input__wrapper checkbox">
    <input type="checkbox" :name="name" :checked="displayValue" class="checkbox__input"
           @change="onChange" :disabled="disabled">
    <span class="checkbox__facade">
      <span class="checkbox__ripple" ref="rippleMask">
        <span class="checkbox__ripple-inner" :style="rippleStyle" ref="ripple"/>
      </span>
      <span class="checkbox__check" @mousedown="onMouseDown" @mouseup="onMouseUp"
            @touchstart="onMouseDown" @touchend="onMouseUp"/>
    </span>
    <span class="checkbox__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { computed, ref, toRefs } from 'vue'

export default {
  name: 'Checkbox',
  props: {
    modelValue: Boolean,
    checked: {
      type: Boolean,
      default: undefined,
    },
    disabled: Boolean,
    name: String,
  },
  setup(props, { emit }) {
    const {
      modelValue,
      checked,
    } = toRefs(props)
    const rippleStyle = ref({})
    const rippleMask = ref(null)

    const onChange = (e) => {
      if (checked.value === undefined) emit('update:modelValue', e.target.checked)
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

    const displayValue = computed(() => {
      if (checked.value === undefined) return modelValue.value
      return checked.value
    })

    return {
      rippleMask,
      rippleStyle,
      onChange,
      onMouseDown,
      onMouseUp,
      displayValue,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '../../styles/vars.styl'

.checkbox
  font-size 14px
  line-height 20px
  display flex

  &__input
    position absolute
    left -9999px

  &__facade
    position relative
    margin-top 1px

  &__input:disabled + &__facade
    pointer-events none
    opacity .65

  &__check
    display block
    width 18px
    height 18px
    border 2px solid #b3b3b3
    border-radius 3px
    position relative
    transition all .2s ease
    cursor pointer

    &::before
      content ''
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      background-color accent
      background-image url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.02132 10.2071C5.63079 9.81657 4.99763 9.81657 4.6071 10.2071C4.21658 10.5976 4.21658 11.2308 4.6071 11.6213L7.43553 14.4497C7.82605 14.8403 8.55402 14.8026 8.94454 14.412L15.6621 7.69453C16.0526 7.30401 16.0526 6.67084 15.6621 6.28032C15.2715 5.8898 14.6384 5.8898 14.2478 6.28032L8.17119 12.357L6.02132 10.2071Z' fill='white'/%3E%3C/svg%3E")
      background-repeat no-repeat
      background-position center
      opacity 0
      transition all .2s ease

  :checked + &__facade &__check
    border-color accent

    &::before
      opacity 1

  &__ripple
    display block
    width 32px
    height 32px
    position absolute
    left -7px
    top -7px
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
