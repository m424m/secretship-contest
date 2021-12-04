<template>
  <main class="apps">
    <section class="input-row">
      <TextInput placeholder="Search apps" v-model="search"/>
      <router-link to="/apps/create">
        <button>Create new app</button>
      </router-link>
    </section>

    <section class="columns no-center">
      <AppsItem v-for="app in displayApps" :app="app" :key="app.id" class="column"/>
    </section>
  </main>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
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
    const apps = ref([...store.getters.apps]);

    const search = ref('');

    const displayApps = computed(() => {
      if (search.value) {
        return apps.value.filter((app) => app.name.toLowerCase()
          .includes(search.value.toLowerCase()));
      }
      return apps.value;
    });

    return {
      apps,
      search,
      displayApps,
    };
  },
};
</script>
