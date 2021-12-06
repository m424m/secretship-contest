<template>
  <div class="select" v-click-outside="closeDropdown">
    <select class="select__fallback" :name="name" :multiple="multiple" v-model="fallbackValue">
      <option v-for="(option, i) in options"
           :key="`option-${i}`">
        {{ displayKey ? option[displayKey] : option }}
      </option>
    </select>
    <TextInput :placeholder="placeholder" v-model="search"
               :small-placeholder="!multiple"
               @focus="openDropdown"
               :class="[{focus: isOpen}]"
               :disabled="disabled"
               :hint="hint"
               :invalid="invalid"
               ref="field"
               @removeOption="removeOption"
               @keydown="navigateOptions"
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

      <template #info v-if="$slots.info"><slot name="info"/></template>
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
    disabled: Boolean,
    name: String,
    hint: String,
    invalid: [Boolean, String],
    options: Array,
  },
  setup(props, { emit }) {
    const {
      modelValue,
      displayKey,
      multiple,
      options,
    } = toRefs(props)

    const field = ref(null)

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

    const removeOption = (index = 'last') => {
      if (multiple.value) {
        const filtered = [...modelValue.value]
        filtered.splice(index === 'last' ? modelValue.value.length - 1 : index, 1)
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
          return true
        })
        // exclude options that do not match search query
        .filter((option) => (displayKey.value ? option[displayKey.value] : option)
          .toString()
          .toLowerCase()
          .includes(search.value.toLowerCase()))
      return filtered
    })

    const navigateOptions = () => {
      // TODO: keyboard navigation
    }

    const fallbackValue = computed(() => {
      if (displayKey.value) return modelValue.value.map((i) => i[displayKey])
      return modelValue.value
    })

    return {
      search,
      isOpen,
      openDropdown,
      closeDropdown,
      selectOption,
      removeOption,
      displayOptions,
      field,
      navigateOptions,
      fallbackValue,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "~@/styles/vars.styl"

.select
  position relative

  &__fallback
    display none

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
</style>
