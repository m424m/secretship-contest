<template>
  <div class="wallet">
    <section>
      <h4>{{ $t('app.balance') }}</h4>
      <div class="wallet__balance">
        <span class="wallet__balance-ton">{{ app.balance }} <Ton/></span>
        <span class="wallet__balance-usd">(${{ app.balance * 3 }})</span>
      </div>
      <br>
      <div class="button-group">
        <button class="small" @click="addFunds">{{ $t('app.add_funds') }}</button>
        <button class="small" @click="withdraw">{{ $t('app.withdraw') }}</button>
      </div>
    </section>
    <br>

    <section>
      <h4>{{ $t('app.transaction_history') }}</h4>

      <Table v-if="transactions.length" :columns="columns" :data="transactions">
        <template #timestamp="{value}">{{
            dayjs(value)
              .format('MMM DD, YYYY HH:mm')
          }}
        </template>
        <template #address="{value}">
          <router-link to="">
            {{ value.slice(0, 10) }}...{{ value.slice(value.length - 3) }}
          </router-link>
        </template>
        <template #amount="{value}">
          <span
            :class="['transaction-amount', value > 0 ? 'plus' : 'minus']">
            {{ value > 0 ? '+' : '-' }}{{ Math.abs(value) }} <Ton/></span>
        </template>
      </Table>

      <p class="no-transactions" v-else>{{ $t('app.no_transactions') }}</p>
    </section>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
import dayjs from 'dayjs'
import Ton from '@/assets/icons/ton.svg'
import { addMoneyToApp, withdrawMoneyFromApp } from '@/api'
import Table from '../../components/common/Table.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  app: {
    required: true,
  },
})

const { app } = toRefs(props)

const addFunds = () => {
  addMoneyToApp(app.value.id, 100)
}

const withdraw = () => {
  withdrawMoneyFromApp(app.value.id, 100)
}

const columns = {
  timestamp: {
    name: t('app.date'),
    sortable: true,
  },
  address: {
    name: t('app.from_to'),
  },
  amount: {
    name: t('app.amount'),
    sortable: true,
    sort: (a, b) => Math.abs(a) - Math.abs(b),
  },
}

// I have no idea what the format should be :(
const transactions = [
  {
    id: 0,
    timestamp: 1638868441899,
    address: '0:00cc09fc8d7bbddf2c70590eb94284960a53ab2cb650739211bcf4069d2a1cac',
    amount: 50,
  },
  {
    id: 1,
    timestamp: 1638867403786,
    address: '0:f861992dc58737db9405818375f371029c8854036137cacb40eefa32f58860c5',
    amount: -100,
  },
  {
    id: 2,
    timestamp: 1638668416900,
    address: '0:18b753cc9f6567775a562a3eb8e78a058ec3bcb9042f5bbecc8f6a5bfaeb81c0',
    amount: -50,
  },
  {
    id: 3,
    timestamp: 1638368430968,
    address: '0:a673b74977a53b4a41ef854bf0d27e67f08ca45a9dc724ad6e5aa71c0d544a38',
    amount: 200,
  },
]
</script>

<style lang="stylus" scoped>
@import "../../styles/vars.styl"

.wallet
  &__balance
    font-size 20px
    font-weight 500
    display flex
    align-items center
    gap 8px

    &-usd
      color $text-secondary

  .transaction-amount
    font-weight 500

    &.plus
      color $success

    &.minus
      color $error

  .no-transactions
    text-align center
    color $text-secondary
</style>
