<template>
  <div class="textarea__wrapper input__wrapper">
    <div :class="['textarea', {focus: isFocused, invalid, disabled}]">
    <textarea class="textarea__field" :name="name" :placeholder="placeholder" :value="modelValue"
              :rows="rows" :disabled="disabled"
              @input="onInput" @focus="onFocus" @blur="onBlur"
    />

      <div class="textarea__meta">
        <div v-if="hint" class="textarea__hint">
          <button type="button" class="textarea__hint-button plain" v-if="hint" tabindex="-1"/>
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

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: String,
  name: String,
  hint: String,
  rows: [Number, String],
  invalid: [Boolean, String],
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

const isFocused = ref(false)

const onInput = (e) => {
  emit('update:modelValue', e.target.value)
  e.target.style.height = 'auto'
  e.target.style.height = `${e.target.scrollHeight}px`
}

const onFocus = () => {
  isFocused.value = true
}

const onBlur = () => {
  isFocused.value = false
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
      background-image url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='white' d='M 5.84 8.03 C 6.32 8.03 6.63 7.81 6.78 7.35 C 6.84 7.11 6.95 6.91 7.09 6.76 C 7.24 6.6 7.52 6.41 7.94 6.17 C 8.41 5.89 8.75 5.59 8.98 5.25 C 9.2 4.91 9.31 4.51 9.31 4.05 C 9.31 3.28 9.02 2.66 8.44 2.2 C 7.86 1.73 7.08 1.5 6.12 1.5 C 5.42 1.5 4.81 1.62 4.29 1.86 C 3.78 2.11 3.41 2.44 3.2 2.85 C 3.07 3.08 3 3.34 3 3.61 C 3 3.89 3.08 4.12 3.26 4.29 C 3.43 4.46 3.67 4.55 3.97 4.55 C 4.45 4.55 4.78 4.34 4.96 3.92 C 5.16 3.46 5.51 3.23 6.01 3.23 C 6.3 3.23 6.53 3.31 6.72 3.47 C 6.9 3.63 6.99 3.84 6.99 4.1 C 6.99 4.38 6.92 4.6 6.77 4.78 C 6.63 4.96 6.34 5.18 5.91 5.43 C 5.55 5.63 5.28 5.86 5.1 6.11 C 4.93 6.35 4.84 6.64 4.84 6.98 L 4.84 6.98 L 4.84 7.02 C 4.84 7.32 4.93 7.57 5.11 7.75 C 5.3 7.94 5.54 8.03 5.84 8.03 Z M 5.88 10.95 C 6.21 10.95 6.49 10.84 6.72 10.62 C 6.96 10.4 7.08 10.13 7.08 9.81 C 7.08 9.49 6.96 9.22 6.72 9 C 6.49 8.78 6.21 8.67 5.88 8.67 C 5.54 8.67 5.26 8.78 5.03 9 C 4.79 9.22 4.68 9.49 4.68 9.81 C 4.68 10.13 4.79 10.4 5.03 10.62 C 5.26 10.84 5.54 10.95 5.88 10.95 Z'/%3E%3C/svg%3E%0A")
      background-repeat no-repeat
      background-position center
      background-size 12px
      color white
      cursor help

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
