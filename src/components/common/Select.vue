<template>
  <div class="select" v-click-outside="closeDropdown">
    <TextInput :placeholder="placeholder" v-model="search"
               :small-placeholder="!multiple"
               @keydown="keydown" @focus="openDropdown"
               :class="[{focus: isOpen}]"
               :hint="hint"
               ref="field"
    >
      <template #selectItems v-if="multiple && modelValue?.length || !multiple && modelValue">
        <template v-if="multiple && modelValue?.length">
          <SelectItem
            v-for="(item, i) in modelValue"
            :key="`item-${i}`"
            :image="imageKey ? item[imageKey] : null" @remove="removeOption(i)">
            {{ displayKey ? item[displayKey] : item }}
          </SelectItem>
        </template>

        <SelectItem v-else-if="!multiple && modelValue"
                    :image="imageKey ? modelValue[imageKey] : null" @remove="removeOption">
          {{ displayKey ? modelValue[displayKey] : modelValue }}
        </SelectItem>
      </template>
    </TextInput>

    <transition name="fade">
      <div class="select__options" v-if="isOpen && displayOptions.length">
        <div class="select__option" v-for="(option, i) in displayOptions"
             :key="`option-${i}`"
             @click="selectOption(option)">
          {{ displayKey ? option[displayKey] : option }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref, toRefs } from 'vue'
import TextInput from './TextInput.vue'
import SelectItem from './SelectItem.vue'

export default {
  name: 'Select',
  components: {
    SelectItem,
    TextInput,
  },
  props: {
    modelValue: [Array, String, Number],
    displayKey: String,
    imageKey: String,
    placeholder: String,
    multiple: Boolean,
    hint: String,
  },
  setup(props, { emit }) {
    const {
      modelValue,
      displayKey,
      multiple,
    } = toRefs(props)

    const field = ref(null)

    const options = ref([
      'Education',
      'Art & Design',
      'Books',
      'Business',
      'Video Games',
      'History',
      'Music',
      'Movies',
    ])

    const search = ref('')
    const isOpen = ref(false)

    const openDropdown = () => {
      isOpen.value = true
      field.value.$el.scrollIntoView()
    }
    const closeDropdown = () => {
      isOpen.value = false
    }

    const selectOption = (option) => {
      if (multiple.value) {
        emit('update:modelValue', [...modelValue.value, option])
      } else {
        emit('update:modelValue', option)
      }
      search.value = ''
      closeDropdown()
    }

    const removeOption = (index) => {
      if (multiple.value) {
        const filtered = [...modelValue.value]
        filtered.splice(index, 1)
        emit('update:modelValue', filtered)
      } else {
        emit('update:modelValue', null)
      }
    }

    const displayOptions = computed(() => {
      let filtered = [...options.value]
      filtered = filtered
        // exclude selected options
        .filter((option) => {
          if (multiple.value) {
            return !modelValue.value
              .includes((displayKey.value ? option[displayKey.value] : option))
          }
          return modelValue.value !== (displayKey.value ? option[displayKey.value] : option)
        })
        // exclude options that do not match search query
        .filter((option) => (displayKey.value ? option[displayKey.value] : option)
          .toString()
          .toLowerCase()
          .includes(search.value.toLowerCase()))
      return filtered
    })

    const keydown = (e) => {
      if (!search.value.length && e.key === 'Backspace') removeOption(modelValue.value.length - 1)
    }

    return {
      search,
      isOpen,
      options,
      openDropdown,
      closeDropdown,
      selectOption,
      removeOption,
      displayOptions,
      keydown,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/styles/vars.styl"

.select
  position relative

  &__options
    position absolute
    top calc(100% + 10px)
    width 100%
    max-height 220px
    background #fff
    text-align left
    padding 7px 0
    border-radius 6px
    box-shadow 0 0 2px 1px rgba(0, 0, 0, .15)
    border none
    transition all .2s ease
    overflow auto
    overflow-x hidden
    -webkit-overflow-scrolling touch
    z-index 10

  &__option
    font-size 14px
    line-height 18px
    padding 8px 15px
    cursor pointer

    &:hover
      background-color #f2f2f2

.fade-enter-active
.fade-leave-active
  transition opacity .2s ease

.fade-enter-from
.fade-leave-to
  opacity 0
</style>
