<template>
  <Nav v-if="!$route.meta.hideNav"/>
  <router-view/>
</template>

<style lang="stylus">
@require 'styles/common.styl'
</style>

<script>
import Nav from './components/common/Nav.vue';

export default {
  components: { Nav },
};
</script>
