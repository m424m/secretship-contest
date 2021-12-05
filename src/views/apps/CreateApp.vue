<template>
  <main>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="addApp">
          <h4>Create new app</h4>
          <TextInput placeholder="App name" v-model="app.name" small-placeholder required/>
          <TextInput placeholder="Link to the app" v-model="app.url" small-placeholder/>
          <Select placeholder="Category" v-model="app.category"
                  hint="Select one or more."/>
          <Textarea placeholder="Long text"/>
          <button type="submit">Add App</button>
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
import Select from '../../components/common/Select.vue'
import Textarea from '../../components/common/Textarea.vue'

export default {
  name: 'CreateApp',
  components: {
    Textarea,
    Select,
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
