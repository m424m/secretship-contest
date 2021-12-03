<template>
  <main>
    <Tabs>
      <router-link :to="{ name: 'AppWallet' }">Wallet</router-link>
      <router-link :to="{ name: 'AppUsers' }">Users</router-link>
      <router-link :to="{ name: 'AppSettings' }">Settings</router-link>
    </Tabs>

    <router-view/>
  </main>
</template>

<script>
import Tabs from '../../components/common/Tabs.vue';

export default {
  name: 'AppBase',
  components: { Tabs },
};
</script>

<style lang="less" scoped>

</style>
