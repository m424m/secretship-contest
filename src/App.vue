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

<script setup>
import { useMeta } from 'vue-meta'
import Nav from './components/common/Nav.vue'

useMeta({
  title: '',
  htmlAttrs: {
    lang: 'en',
  },
})

const appName = process.env.VITE_APP_NAME
</script>
