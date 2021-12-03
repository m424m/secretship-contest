<template>
  <main>
    <Tabs>
      <router-link to="/account/edit">Account info</router-link>
      <router-link to="/help">Help</router-link>
    </Tabs>
  </main>
</template>

<script>
import Tabs from '../components/common/Tabs.vue';

export default {
  name: 'Help',
  components: { Tabs },
};
</script>

<style lang="stylus" scoped>

</style>
