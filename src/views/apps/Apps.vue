<template>
  <main class="apps">
    <section class="input-row">
      <TextInput class="apps__search" :placeholder="$t('apps.search')" v-model="search">
        <template #prefix>
          <Search/>
        </template>
      </TextInput>
      <router-link class="button" to="/apps/create">{{ $t('apps.create') }}</router-link>
    </section>

    <section class="columns no-center" v-if="apps.length">
      <AppsItem v-for="app in displayApps" :app="app" :key="app.id"/>
    </section>

    <section class="columns" v-else>
      <div class="column no-apps">
        <p>{{ $t('apps.no_apps') }}</p>
      </div>
    </section>
  </main>
</template>

<script>
import { useMeta } from 'vue-meta'
import { ref, computed } from 'vue'
import { getApps } from '@/api'
import TextInput from '../../components/common/TextInput.vue'
import AppsItem from '../../components/apps/AppsItem.vue'
import Search from '@/assets/icons/search.svg'

export default {
  name: 'Apps',
  components: {
    AppsItem,
    TextInput,
    Search,
  },
  setup() {
    useMeta({ title: 'Apps' })

    const apps = ref(getApps()
      .sort((a, b) => b.created - a.created))

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

.apps__search
  svg
    display block
    color #a8a8a8
    width 17px
    height 17px

.no-apps
  color text-secondary
  text-align center

  button
    margin auto
</style>
