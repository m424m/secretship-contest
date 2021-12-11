<template>
  <main>
    <Tabs>
      <router-link to="/showcase">Tab 1</router-link>
      <router-link to="/showcase/subpage">Tab 2</router-link>
    </Tabs>
    <h3>Component showcase</h3><br>
    <form @submit.prevent="onSubmit">
      <div class="container">
        <div class="col-5 col-md-10 offset-md-1">
          <h4>Basic info</h4>
          <TextInput placeholder="A normal input" v-model="formData.input" small-placeholder
                     hint="This is just a normal input with a hint.">
            <template #info>
              TextInput has a prop named <b>small-placeholder</b>. It makes the placeholder do the
              thing when the field is focused.
            </template>
          </TextInput>
          <Textarea placeholder="Textarea" v-model="formData.textarea"
                    hint="Textareas can have hints too!"/>
          <Select :options="selectOptions" v-model="formData.select"
                  placeholder="Select" hint="This select holds a single value."/>
          <Select :options="selectOptions" v-model="formData.selectMultiple" multiple
                  placeholder="Multiple select" hint="And this one accepts an array."/>
          <TextInput placeholder="0.00" type="number" v-model="formData.prefixInput">
            <template #prefix>$</template>
            <template #info>There's also a #prefix slot.</template>
          </TextInput>
        </div>
        <div class="col-7 offset-5 col-md-10 offset-md-1">
          <h4>Some more stuff</h4>
          <TextInput placeholder="Invalid disabled field" invalid disabled
                     hint='You can set "invalid" as a bool...'/>
          <Textarea placeholder="Empty textarea" v-model="formData.invalidTextarea"
                    :invalid="formData.invalidTextarea?.length ? 'This field must be empty.' : null"
                    hint="...or as a string with explanation!">
            <template #info>Please don't enter anything here.</template>
          </textarea>
          <div class="radio-group">
            <h4>Radio group</h4>
            <Radio v-model="formData.radio" value="1">Option 1</Radio>
            <Radio v-model="formData.radio" value="2">Option 2</Radio>
          </div>
          <Checkbox v-model="formData.checkbox">
            I agree that these components are pretty cool
          </Checkbox>
          <button>Submit Form</button>
        </div>
      </div>
    </form>

    <Modal ref="modal">
      <template #title>This is a modal window.</template>
      <p>
        Thank you for submitting the form. Here are your answers:
      </p>
      <p>
        <span v-for="(value, field) in formData" :key="field">
          <b>{{ field }}:</b> {{ value }}<br>
        </span>
      </p>
    </Modal>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import TextInput from '../components/common/TextInput.vue'
import Textarea from '../components/common/Textarea.vue'
import Tabs from '../components/common/Tabs.vue'
import Select from '../components/common/Select.vue'
import Radio from '../components/common/Radio.vue'
import Checkbox from '../components/common/Checkbox.vue'
import Modal from '../components/common/Modal.vue'

const selectOptions = [
  'Option #1',
  'Option #2',
  'Option #3',
  'Option #4',
  'Option #5',
]

const modal = ref(null)

const formData = ref({
  input: null,
  textarea: null,
  select: '',
  selectMultiple: [],
  prefixInput: null,
  invalidTextarea: null,
  radio: null,
  checkbox: false,
})

const onSubmit = () => {
  modal.value.show()
}
</script>

<style lang="less" scoped>

</style>
