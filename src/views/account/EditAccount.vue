<template>
  <main>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="saveData">
          <section>
            <h4>Account</h4>
            <AccountPreview/>
          </section>

          <section>
            <h4>Personal info</h4>
            <TextInput placeholder="First name" v-model="form.firstName" small-placeholder/>
            <TextInput placeholder="Last name" v-model="form.lastName" small-placeholder/>
            <input type="submit" value="Save Info">
          </section>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import TextInput from '../../components/common/TextInput.vue'
import AccountPreview from '../../components/account/AccountPreview.vue'
import { setUserAccountInfo } from '../../api'

export default {
  name: 'EditAccount',
  components: {
    AccountPreview,
    TextInput,
  },
  setup() {
    const store = useStore()
    const form = ref({ ...store.getters.user.account })

    const saveData = () => {
      setUserAccountInfo(form)
    }

    return {
      form,
      saveData,
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
