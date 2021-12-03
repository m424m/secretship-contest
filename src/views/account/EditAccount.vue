<template>
  <main>
    <div class="columns">
      <div class="column">
        <section>
          <h4>Account</h4>
          <AccountPreview/>
        </section>

        <section>
          <h4>Personal info</h4>
          <form @submit.prevent="saveData">
            <TextInput placeholder="First name" v-model="form.firstName" small-placeholder/>
            <TextInput placeholder="Last name" v-model="form.lastName" small-placeholder/>
            <input type="submit" value="Save Info">
          </form>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import TextInput from '../../components/common/TextInput.vue';
import AccountPreview from '../../components/account/AccountPreview.vue';
import { setUserAccountInfo } from '../../api';

export default {
  name: 'EditAccount',
  components: {
    AccountPreview,
    TextInput,
  },
  data() {
    return {};
  },
  methods: {
    saveData() {
      setUserAccountInfo(this.form);
    },
  },
  setup() {
    const store = useStore();
    const form = ref({ ...store.getters.user.account });
    return { form };
  },
};
</script>

<style lang="stylus" scoped>

</style>
