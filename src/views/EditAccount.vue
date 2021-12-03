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
          <form @submit.prevent="saveData">
            <TextInput placeholder="First name" v-model="form.firstName"/>
            <TextInput placeholder="Last name" v-model="form.lastName"/>
            <input type="submit" value="Save Info">
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import TextInput from '../components/common/TextInput.vue';
import AccountPreview from '../components/account/AccountPreview.vue';
import Tabs from '../components/common/Tabs.vue';
import { setUserAccountInfo } from '../api';

export default {
  name: 'EditAccount',
  components: {
    Tabs,
    AccountPreview,
    TextInput,
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    saveData() {
      setUserAccountInfo(this.form);
    },
  },
  setup() {
    onMounted(() => {
      const store = useStore()
      this.form = { ...store.getters.user.account };
    });
  },
};
</script>

<style lang="stylus" scoped>

</style>
