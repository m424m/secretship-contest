<template>
  <main class="apps">
    <section class="input-row">
      <TextInput placeholder="Search apps"/>
      <router-link to="/apps/create">
        <button>Create new app</button>
      </router-link>
    </section>

    <section class="columns">
      <AppsItem v-for="app in apps" :app="app" :key="app.id" class="column"/>
    </section>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
import TextInput from '../../components/common/TextInput.vue';
import AppsItem from '../../components/apps/AppsItem.vue';

export default {
  name: 'Apps',
  components: {
    AppsItem,
    TextInput,
  },
  setup() {
    const store = useStore();
    const apps = ref({ ...store.getters.apps });
    return { apps };
  },
};
</script>

<style lang="stylus" scoped>

</style>
