<template>
  <main>
    <div class="columns">
      <div class="column">
        <form>
          <TextInput placeholder="App name"/>
          <TextInput placeholder="Link to app"/>
          <TextInput placeholder="Category"/>
          <input type="submit" value="Add App">
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import TextInput from '../components/common/TextInput.vue';

export default {
  name: 'EditAccount',
  components: {
    TextInput,
  },
};
</script>

<style lang="stylus" scoped>

</style>
