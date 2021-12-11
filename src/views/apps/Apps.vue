<template>
  <main class="apps">
    <section class="input-group">
      <TextInput class="apps__search" :placeholder="$t('apps.search')" v-model="search">
        <template #prefix>
          <Search/>
        </template>
      </TextInput>
      <router-link class="button" to="/apps/create">{{ $t('apps.create') }}</router-link>
    </section>

    <section class="container" v-if="apps.length">
      <AppsItem v-for="app in displayApps" :app="app" :key="app.id"/>
    </section>

    <section class="container" v-else>
      <div class="col-12 no-apps">
        <p>{{ $t('apps.no_apps') }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getApps } from '@/api'
import TextInput from '../../components/common/TextInput.vue'
import AppsItem from '../../components/apps/AppsItem.vue'
import Search from '@/assets/icons/search.svg'

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
