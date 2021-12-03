<template>
  <main>
    <Tabs>
      <router-link to="/apps/5/wallet">Wallet</router-link>
      <router-link to="/apps/5/users">Users</router-link>
      <router-link to="/apps/5/settings">Settings</router-link>
    </Tabs>
  </main>
</template>

<script>
import Tabs from '../components/common/Tabs.vue';

export default {
  name: 'ViewApp',
  components: { Tabs },
};
</script>

<style lang="less" scoped>

</style>
