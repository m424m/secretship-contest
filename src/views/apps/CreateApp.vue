<template>
  <main>
    <div class="container">
      <div class="col-6 offset-3 col-md-10 offset-md-1">
        <form @submit.prevent="addApp">
          <h4>{{ $t('app.create') }}</h4>
          <TextInput :placeholder="$t('app.name')" v-model="app.name" name="name"
                     small-placeholder :invalid="validations.name"/>
          <TextInput :placeholder="$t('app.link')" v-model="app.url" name="url"
                     :invalid="validations.url"
                     small-placeholder/>
          <Select :placeholder="$t('app.category')" name="category"
                  v-model="app.category" :options="categories"
                  :invalid="validations.category"/>
          <button type="submit" :disabled="disabled">{{ $t('app.add') }}</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '../../components/common/TextInput.vue'
import Select from '../../components/common/Select.vue'
import { createApp } from '@/api'

useMeta({ title: 'Create App' })

const router = useRouter()

const app = ref({
  name: '',
  url: '',
  category: '',
})

const categories = [
  'Education',
  'Art & Design',
  'Books',
  'Business',
  'Video Games',
  'History',
  'Music',
  'Movies',
]

// This is just one of an infinite number of approaches to form validation.
// It may look ugly, but it works.
const validate = ref(false)
const validations = computed(() => {
  if (!validate.value) return {}
  return {
    name: [
      !app.value.name ? 'App name is required' : null,
    ].find((i) => i),
    url: [
      !app.value.url ? 'App URL is required' : null,
    ].find((i) => i),
    category: [
      !app.value.category ? 'Please select a category' : null,
    ].find((i) => i),
  }
})

const disabled = computed(() => !(app.value.name
  && app.value.url && app.value.category))

const addApp = () => {
  validate.value = true
  if (!Object.values(validations.value)
    .some((v) => v)) {
    createApp(app.value)
      .then((result) => {
        router.push(`/apps/${result.id}`)
      })
  }
}
</script>
