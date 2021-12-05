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
            <button type="submit">Save Info</button>
          </section>
        </form>
      </div>
    </div>

    <Modal ref="leaveModal" confirm/>
  </main>
</template>

<script>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import TextInput from '../../components/common/TextInput.vue'
import AccountPreview from '../../components/account/AccountPreview.vue'
import { setUserAccountInfo } from '../../api'
import Modal from '../../components/common/Modal.vue'
import confirmLeave from '../../composables/confirmLeave'

export default {
  name: 'EditAccount',
  components: {
    Modal,
    AccountPreview,
    TextInput,
  },
  setup() {
    const store = useStore()
    const form = ref({ ...store.getters.user.account })
    const dataChanged = ref(false)
    const leaveModal = ref(null)

    watch(form.value, () => {
      dataChanged.value = true
    })

    confirmLeave(dataChanged, leaveModal)

    const saveData = () => {
      setUserAccountInfo(form)
      dataChanged.value = false
    }

    return {
      form,
      saveData,
      dataChanged,
      leaveModal,
    }
  },
}
</script>
