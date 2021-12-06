<template>
  <div class="textarea__wrapper input__wrapper">
    <div :class="['textarea', {focus, invalid, disabled}]">
    <textarea class="textarea__field" :name="name" :placeholder="placeholder" :value="modelValue"
              :rows="rows" :disabled="disabled"
              @input="onInput" @focus="onFocus" @blur="onBlur"
    />

      <div class="textarea__meta">
        <div v-if="hint" class="textarea__hint">
          <button type="button" class="textarea__hint-button plain" v-if="hint" tabindex="-1">
            <QuestionBold/>
          </button>
          <div class="textarea__hint-text">
            <div class="textarea__hint-bubble"/>
            {{ hint }}
          </div>
        </div>
      </div>
    </div>

    <div :class="['textarea__info', {'static': !!$slots.info}]">
      <transition name="fade" mode="out-in">
        <span class="textarea__info-invalid" :key="invalid"
              v-if="typeof invalid === 'string'">{{ invalid }}</span>
        <span class="textarea__info-text" v-else key="info"><slot name="info"/></span>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import QuestionBold from '@/assets/icons/question-bold.svg'

export default {
  name: 'Textarea',
  components: { QuestionBold },
  props: {
    modelValue: String,
    placeholder: String,
    name: String,
    hint: String,
    rows: [Number, String],
    invalid: [Boolean, String],
    disabled: Boolean,
  },
  setup(props, { emit }) {
    const focus = ref(false)

    const onInput = (e) => {
      emit('update:modelValue', e.target.value)
      e.target.style.height = 'auto'
      e.target.style.height = `${e.target.scrollHeight}px`
    }

    const onFocus = () => {
      focus.value = true
    }

    const onBlur = () => {
      focus.value = false
    }

    return {
      onInput,
      onFocus,
      onBlur,
      focus,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.textarea
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

  .focus &
  &.focus
    box-shadow inset 0 0 0 2px accent

    .invalid&
      box-shadow inset 0 0 0 2px error

  &.invalid
    box-shadow inset 0 0 0 1px error

  &.disabled
    opacity .65

  &__field
    background none
    border none
    resize none
    width 100%
    padding 15px
    margin 0
    font-family inherit
    color text
    font-size 14px
    line-height 18px
    flex 1

    &::placeholder
      color #999
      transition all .2s ease
      -webkit-font-smoothing antialiased

    &:focus::placeholder
      opacity .6

  &__meta
    padding 5px
    align-self flex-start

    &:empty
      display none

  &__hint
    padding 10px
    cursor help

    &-button
      margin 0
      width 18px
      height 18px
      border-radius 50%
      background-color #c0c4c7
      color white
      cursor help

      svg
        width 12px

    &-text
      display flex
      align-items center
      justify-content center
      font-size 14px
      line-height 19px
      color #fff
      padding 10px 15px 10px
      width max-content
      max-width unquote('min(350px, calc(100vw - 30px))')
      position absolute
      right 0
      bottom 100%
      margin-bottom 3px
      z-index 1
      text-align center
      transition all .2s ease
      transition-delay .075s
      transform translateY(-10px)
      opacity 0
      visibility hidden

    &:hover &-text
      opacity 1
      visibility visible
      transform none
      transition-delay .2s
      cursor help

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

  &__info
    font-size 13px
    line-height 17px
    color text-secondary
    padding-left 15px
    padding-right 5px
    margin-top 8px

    &:not(.static)
      position absolute
      margin-top 2px

    &-invalid
      font-weight 500
      color error
</style>
