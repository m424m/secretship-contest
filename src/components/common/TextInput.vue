<template>
  <label class="input">
    <input class="input__field" :type="type" :value="modelValue" :placeholder="placeholder"
           :disabled="disabled" :name="name" :id="name" @input="emit"/>
    <span :class="['input__placeholder', {small: smallPlaceholder}]">{{ placeholder }}</span>

    <small class="input__hint" v-if="hint">{{ hint }}</small>
  </label>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {},
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    disabled: Boolean,
    name: String,
    prefix: String,
    hint: String,
    tooltip: String,
    smallPlaceholder: Boolean,
  },
  methods: {
    emit(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/vars.styl'

.input
  width 100%
  display block
  position relative
  font-size 14px

  &__field
    width 100%
    font-size 14px
    color text
    line-height 18px
    padding 15px
    box-shadow inset 0 0 0 1px #d9d9d9
    border-radius 6px
    transition box-shadow .2s ease
    border none

    &::placeholder
      color transparent
      font-size 0

    &:focus
      box-shadow inset 0 0 0 2px accent

  &__placeholder
    display block
    position: absolute
    left 15px
    top 50%
    transform translateY(-50%)
    color #999
    transition all .2s ease
    transform-origin 0 50%
    user-select none
    pointer-events none

    &.small
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale

    &::after
      content ''
      width calc(100% + 10px)
      background-color white
      height 100%
      position absolute
      top 0
      left -5px
      transform scaleX(0)
      transition all .2s ease
      transform-origin 8px 50%
      z-index -1

  &__field:focus + &__placeholder:not(.small)
    opacity .6

  &__field:not(:placeholder-shown) + &__placeholder:not(.small)
    display none

  &__field:focus + &__placeholder.small
    color link

  &__field:not(:placeholder-shown) + &__placeholder.small
  &__field:focus + &__placeholder.small
    top 0
    transform translateY(-50%) scale(.93)

    &::after
      transform scaleX(1)

  &__hint
    display block
    margin-top 10px
    margin-left 15px
</style>
