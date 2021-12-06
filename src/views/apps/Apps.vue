<template>
  <main class="apps">
    <section class="input-row">
      <TextInput placeholder="Search apps" v-model="search"/>
      <router-link class="button" to="/apps/create">Create new app</router-link>
    </section>

    <section class="columns no-center" v-if="apps.length">
      <AppsItem v-for="app in displayApps" :app="app" :key="app.id"/>
    </section>

    <section class="columns" v-else>
      <div class="column no-apps">
        <p>No apps.</p>
        <button class="small">Create one!</button>
      </div>
    </section>
  </main>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue'
import TextInput from '../../components/common/TextInput.vue'
import AppsItem from '../../components/apps/AppsItem.vue'

export default {
  name: 'Apps',
  components: {
    AppsItem,
    TextInput,
  },
  setup() {
    const store = useStore()
    const apps = ref([...store.getters.apps])

    const search = ref('')

    const displayApps = computed(() => {
      if (search.value) {
        return apps.value.filter((app) => app.name.toLowerCase()
          .includes(search.value.toLowerCase()))
      }
      return apps.value
    })

    return {
      apps,
      search,
      displayApps,
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.no-apps
  color text-secondary
  text-align center

  button
    margin auto
</style>
