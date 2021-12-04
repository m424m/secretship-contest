<template>
  <main>
    <Tabs>
      <router-link :to="{ name: 'AppWallet' }">Wallet</router-link>
      <router-link :to="{ name: 'AppUsers' }">Users</router-link>
      <router-link :to="{ name: 'AppSettings' }">Settings</router-link>
    </Tabs>

    <router-view :app="app"/>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Tabs from '../../components/common/Tabs.vue'
import { getApp } from '../../api'

export default {
  name: 'AppBase',
  components: { Tabs },
  setup() {
    const route = useRoute()
    const app = ref(getApp(parseInt(route.params.id, 10)))

    return { app }
  },
}
</script>

<style lang="less" scoped>

</style>
