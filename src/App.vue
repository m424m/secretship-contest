<template>
  <metainfo>
    <template #title="{ content }">{{ content? `${content} — Secretship` : 'Secretship Contest' }}
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
  },
}
</script>
