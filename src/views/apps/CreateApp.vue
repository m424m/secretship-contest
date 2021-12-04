<template>
  <main>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="addApp">
          <h4>Create new app</h4>
          <TextInput placeholder="App name" v-model="app.name" small-placeholder/>
          <TextInput placeholder="Link to the app" v-model="app.url" small-placeholder/>
          <TextInput placeholder="Category" v-model="app.category" small-placeholder/>
          <input type="submit" value="Add App">
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TextInput from '../../components/common/TextInput.vue'
import { createApp } from '@/api'

export default {
  name: 'CreateApp',
  components: {
    TextInput,
  },
  setup() {
    const router = useRouter()

    const app = ref({
      name: null,
      url: null,
      category: null,
    })

    const addApp = () => {
      createApp(app.value)
        .then((result) => {
          router.push(`/apps/${result.id}`)
        })
    }

    return {
      app,
      addApp,
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
