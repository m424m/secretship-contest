<template>
  <main>
    <div class="columns">
      <div class="column">
        <h4>Create new app</h4>
        <form @submit.prevent="addApp">
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
import TextInput from '../../components/common/TextInput.vue';
import { createApp } from '@/api';

export default {
  name: 'EditAccount',
  components: {
    TextInput,
  },
  data() {
    return {
      app: {
        name: null,
        url: null,
        category: null,
      },
    };
  },
  methods: {
    addApp() {
      createApp(this.app).then((r) => {
        console.log(r)
      })
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
