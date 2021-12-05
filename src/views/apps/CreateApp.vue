<template>
  <main>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="addApp">
          <h4>Create new app</h4>
          <TextInput placeholder="App name" v-model="app.name" small-placeholder
                     :invalid="validations.name"/>
          <TextInput placeholder="Link to the app" v-model="app.url" :invalid="validations.url"
                     small-placeholder/>
          <Select placeholder="Category" v-model="app.category" :options="categories"
                  hint="Select a category for your app." :invalid="validations.category"/>
          <button type="submit" :disabled="disabled">Add App</button>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '../../components/common/TextInput.vue'
import { createApp } from '@/api'
import Select from '../../components/common/Select.vue'

export default {
  name: 'CreateApp',
  components: {
    Select,
    TextInput,
  },
  setup() {
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
    // You are free to do this any way you want.
    const validate = ref(false)
    const validations = computed(() => {
      if (!validate.value) return {}
      return {
        name: (() => {
          if (!app.value.name) return 'App name is required'
          return null
        })(),
        url: (() => {
          if (!app.value.url) return 'App name is required'
          return null
        })(),
        category: (() => {
          if (!app.value.category) return 'Please select a category'
          return null
        })(),
      }
    })

    const disabled = computed(() => !(app.value.name.length
      && app.value.url.length && app.value.category.length))

    const addApp = () => {
      validate.value = true
      if (!Object.values(validations.value)
        .some((v) => !!v)) {
        createApp(app.value)
          .then((result) => {
            router.push(`/apps/${result.id}`)
          })
      }
    }

    return {
      app,
      addApp,
      validations,
      disabled,
      categories,
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
