<template>
  <div
    :class="['input', {focus, 'small-placeholder': smallPlaceholder,
      'select-items': !!$slots.selectItems}]">
    <span class="input__prefix" v-if="prefix">{{ prefix }}</span>
    <div class="input__main">
      <slot name="selectItems"/>
      <label :class="['input__label', {empty: !!modelValue}]">
        <input class="input__field" :type="type" :value="modelValue" :placeholder="placeholder"
               :disabled="disabled" :name="name" :id="name"
               @input="emit" @focus="onFocus" @blur="onBlur"/>
        <span class="input__placeholder" v-if="!smallPlaceholder">{{ placeholder }}</span>
        <span class="input__small-placeholder" v-if="smallPlaceholder">{{ placeholder }}</span>
      </label>
    </div>

    <div class="input__meta">
      <div v-if="hint" class="input__hint">
        <button type="button" class="input__hint-button plain" v-if="hint">
          <Icon name="question-bold"/>
        </button>
        <div class="input__hint-text">
          <div class="input__hint-bubble"/>
          {{hint}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Icon from './Icon.vue'

export default {
  name: 'TextInput',
  components: { Icon },
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
    loading: Boolean,
    smallPlaceholder: Boolean,
  },
  methods: {
    emit(e) {
      this.$emit('update:modelValue', e.target.value)
    },
  },
  setup(props, { emit }) {
    const focus = ref(false)

    const onFocus = () => {
      focus.value = true
      emit('focus')
    }

    const onBlur = () => {
      focus.value = false
      emit('blur')
    }

    return {
      focus,
      onFocus,
      onBlur,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import '~@/styles/vars.styl'

.input
  width 100%
  display flex
  align-items center
  position relative
  font-size 14px
  box-shadow inset 0 0 0 1px #d9d9d9
  border-radius 6px
  transition box-shadow .2s ease
  cursor unquote('text')
  flex-wrap wrap

  &__main
    flex 1
    display flex
    align-items center
    flex-wrap wrap

  &:focus-within
  &.focus
    box-shadow inset 0 0 0 2px accent

  &__label
    width 100%
    flex 1

  &:not(.small-placeholder) &__label
    position relative

  &__placeholder
    content attr(data-placeholder)
    color #999
    font-family 'Roboto'
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    position absolute
    left 3px
    top 50%
    transform translateY(-50%)
    max-width 100%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    pointer-events none
    transition opacity .2s ease
    z-index -1

  &__label:first-child &__placeholder
    left 15px

  &__label:focus-within &__placeholder
    opacity .6

  &__field:not(:placeholder-shown) + &__placeholder
    display none

  &__field
    width 100%
    font-size 14px
    color text
    line-height 18px
    padding 15px
    transition box-shadow .2s ease
    border none
    background none

    &::placeholder
      color transparent
      font-size 0
      opacity 0

  &__prefix
    padding 0 15px
    padding-right 0
    transition opacity .2s ease

    .small-placeholder:not(:focus-within) &
      opacity 0

    + input
      padding-left 12px

  &__small-placeholder
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
      transform-origin 40% 50%
      z-index -1

  &__field:focus::placeholder
    opacity .6

  &:not(.small-placeholder) &__field:not(:placeholder-shown) + &__small-placeholder
    display none

  &__field:focus + &__small-placeholder
  &.focus &__field + &__small-placeholder
    color link

  &__field:not(:placeholder-shown) + &__small-placeholder
  &__field:focus + &__small-placeholder
  &.focus &__field + &__small-placeholder
  .select-items &__small-placeholder
    top 0
    transform translateY(calc(-50% - 1px)) scale(.93)

    &::after
      transform scaleX(1)

  &.select-items &__main
    padding 8px 12px

    .select-item + label
      padding 7px 0 7px 3px
      min-width 5rem

      input
        padding 0

  &__meta
    padding 5px

  &__hint
    padding 10px
    cursor pointer

    &-button
      margin 0
      width 18px
      height 18px
      border-radius 50%
      background-color #c0c4c7
      color white

    &-text
      display flex
      align-items center
      justify-content center
      font-size 14px
      line-height 19px
      color #fff
      padding 11px 15px 10px
      width max-content
      max-width unquote('min(350px, calc(100vw - 30px))')
      position absolute
      right 0
      bottom 100%
      z-index 1
      text-align center
      transition all .2s ease
      transform translateY(-10px)
      opacity 0
      visibility hidden
      transition-delay .075s

    &:hover &-text
      opacity 1
      visibility visible
      transform none
      transition-delay .2s

    &-bubble
      content: ''
      border-radius 8px
      position absolute
      background-color #202426
      width 100%
      height 100%
      z-index -1
      opacity .85

      &::after
        content ''
        position absolute
        display inline-block
        width 18px
        height 8px
        right 15px
        top 100%
        margin-top -1px
        background-image url("data:image/svg+xml,%3Csvg width='18' height='8' viewBox='0 0 18 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 1V0H18V1C17.74 1 17.24 1.21 16.86 1.58L11.47 6.91C10.3 8.07 8.42 8.07 7.25 6.91L1.86 1.58C1.48 1.21 0.98 1 0.45 1H0Z' fill='%23202426'/%3E%3C/svg%3E%0A")
</style>
