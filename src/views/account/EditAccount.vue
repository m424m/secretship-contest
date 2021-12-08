<template>
  <main>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="saveData">
          <section>
            <h4>{{ $t('account.account') }}</h4>
            <AccountPreview/>
          </section>

          <section>
            <h4>{{ $t('account.personal_info') }}</h4>
            <TextInput :placeholder="$t('account.first_name')" v-model.trim="form.firstName"
                       small-placeholder/>
            <TextInput :placeholder="$t('account.last_name')" v-model.trim="form.lastName"
                       small-placeholder/>
            <button type="submit" :disabled="disabled">{{ $t('account.save') }}</button>
          </section>
        </form>
      </div>
    </div>

    <Modal ref="leaveModal" confirm/>
  </main>
</template>

<script setup>
import { useMeta } from 'vue-meta'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import TextInput from '../../components/common/TextInput.vue'
import AccountPreview from '../../components/account/AccountPreview.vue'
import { setUserAccountInfo } from '@/api'
import Modal from '../../components/common/Modal.vue'
import confirmLeave from '../../composables/confirmLeave'

useMeta({ title: 'Edit Account' })

const router = useRouter()
const store = useStore()
const form = ref({ ...store.getters.user.account })
const dataChanged = ref(false)
const leaveModal = ref(null)

watch(form.value, () => {
  dataChanged.value = true
})

const disabled = computed(() => !form.value.firstName)

confirmLeave(dataChanged, leaveModal)

const saveData = () => {
  setUserAccountInfo(form)
    .then(() => {
      router.push('/')
    })
  dataChanged.value = false
}
</script>
