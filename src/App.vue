<template>
  <metainfo>
    <template #title="{ content }">{{ content ? `${content} — ${appName}` : appName }}
    </template>
  </metainfo>
  <Nav v-if="!$route.meta.hideNav"/>
  <router-view/>
</template>

<style lang="stylus">
@require 'styles/common.styl'
</style>

<script>
import { useMeta } from 'vue-meta'
import Nav from './components/common/Nav.vue'

export default {
  components: { Nav },
  setup() {
    useMeta({
      title: '',
      htmlAttrs: {
        lang: 'en',
        amp: true,
      },
    })

    const appName = process.env.VITE_APP_NAME

    return {
      appName,
    }
  },
}
</script>
