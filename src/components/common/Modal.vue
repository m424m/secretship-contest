<template>
  <teleport to="#app">
    <div :class="['modal', {small}]" v-if="isOpen">
      <div class="modal__backdrop" @click="hide"/>
      <div class="modal__content">
        <div class="modal__body">
          <h3 class="modal__title" v-if="$slots.title">
            <slot name="title"/>
          </h3>
          <slot>
            <span
              v-if="confirm">{{ $t('leave_confirmation.text') }}</span>
          </slot>
        </div>

        <div class="modal__buttons" v-if="confirm">
          <button @click="answer(false)">{{ no || $t('common.cancel') }}</button>
          <button @click="answer(true)">{{ yes || $t('leave_confirmation.leave') }}</button>
        </div>
        <div class="modal__buttons" v-else>
          <slot name="buttons">
            <button @click="hide">{{ $t('common.close') }}</button>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import {
  onBeforeUnmount,
  onMounted, ref, toRefs, watch,
} from 'vue'

export default {
  name: 'Modal',
  props: {
    small: Boolean,
    confirm: Boolean,
    open: Boolean,
    yes: String,
    no: String,
  },
  setup(props) {
    const { open } = toRefs(props)
    const isOpen = ref(false)
    const answer = ref(null)

    onMounted(() => {
      isOpen.value = open.value
    })

    watch(() => open.value, (val) => {
      isOpen.value = val
    })

    const show = () => {
      isOpen.value = true
    }

    const hide = () => {
      isOpen.value = false
      if (answer.value) answer.value(false)
    }

    const ask = async () => {
      show()
      return new Promise((resolve) => {
        answer.value = (val) => {
          resolve(val)
          answer.value = null
          hide()
        }
      })
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (answer.value) {
          answer.value(false)
        } else {
          hide()
        }
      } else if (e.key === 'Enter' && answer.value) answer.value(true)
    }

    onMounted(() => {
      window.addEventListener('keydown', onKeyDown)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeyDown)
    })

    return {
      isOpen,
      show,
      hide,
      ask,
      answer,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.modal
  position fixed
  width 100%
  height 100%
  top 0
  left 0
  z-index: 99
  display flex
  justify-content center
  align-items center

  &__backdrop
    position absolute
    background-color rgba(0, 0, 0, .6)
    width 100%
    height 100%

  &__content
    background-color white
    border-radius 6px
    box-shadow 0 0 12px rgba(0, 0, 0, .3)
    width fit-content
    font-size 14px
    z-index 1
    min-width 240px
    max-width 600px
    margin 20px
    max-height calc(100vh - 40px)
    display flex
    flex-direction column

    .small &
      width 350px

      @media mobile
        width 100%
        margin 40px
        max-height calc(100vh - 80px)

  &__body
    padding 30px 35px
    padding-bottom 20px
    font-size 15px
    line-height 24px
    overflow auto

    .small &
      padding 23px

    .small & ::v-deep(p)
      font-size 14px

    ::v-deep(*:first-child)
      margin-top 0

    ::v-deep(*:last-child)
      margin-bottom 0

  &__title
    margin 0 0 20px
    font-size 16px

  &__buttons
    padding 20px
    padding-top 0
    display flex
    justify-content flex-end

    .small &
      padding 15px
      padding-top 0

    ::v-deep(button)
      background none
      color #2481cc
      text-transform uppercase
      line-height normal
      padding 9px 12px
      border-radius 3px

      &:hover
        background-color #e6f1f7

      &:active
        background-color #d4e6f1
</style>
