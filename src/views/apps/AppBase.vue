<template>
  <main>
    <Tabs>
      <router-link :to="{ name: 'AppWallet' }">{{ $t('app.wallet') }}</router-link>
      <router-link :to="{ name: 'AppUsers' }">{{ $t('app.users') }}</router-link>
      <router-link :to="{ name: 'AppSettings' }">{{ $t('app.settings') }}</router-link>
    </Tabs>

    <router-view :app="app"/>
  </main>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Tabs from '@/components/common/Tabs.vue'
import { getApp } from '@/api'

const route = useRoute()
const app = ref(getApp(parseInt(route.params.id, 10)))

useMeta({ title: app.value.name })
</script>
