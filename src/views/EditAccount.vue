<template>
  <main>
    <Tabs>
      <router-link to="/account/edit">Info</router-link>
      <router-link to="/account/wallet">Budget</router-link>
    </Tabs>

    <div class="columns">
      <div class="column">
        <section>
          <h4>Account</h4>
          <AccountPreview/>
        </section>

        <section>
          <h4>Personal info</h4>
          <form>
            <TextInput placeholder="First name"/>
            <TextInput placeholder="Last name"/>
            <input type="submit" value="Save Info">
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import TextInput from '../components/common/TextInput.vue';
import AccountPreview from '../components/account/AccountPreview.vue';
import Tabs from '../components/common/Tabs.vue';

export default {
  name: 'EditAccount',
  components: {
    Tabs,
    AccountPreview,
    TextInput,
  },
};
</script>

<style lang="stylus" scoped>

</style>
