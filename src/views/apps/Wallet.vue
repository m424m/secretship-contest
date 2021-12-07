<template>
  <div class="wallet">
    <section>
      <h4>{{ $t('app.balance') }}</h4>
      <div class="wallet__balance">
        <span class="wallet__balance-ton">{{ app.balance }} <Ton/></span>
        <span class="wallet__balance-usd">(${{ app.balance * 3 }})</span>
      </div>
      <br>
      <div class="buttons">
        <button class="small" @click="addFunds">{{$t('app.add_funds')}}</button>
        <button class="small" @click="withdraw">{{$t('app.withdraw')}}</button>
      </div>
    </section>
    <br>

    <section>
      <h4>{{$t('app.transaction_history')}}</h4>

      <table v-if="transactions.length">
        <thead>
        <tr>
          <th>{{$t('common.date')}}</th>
          <th>{{$t('app.from_to')}}</th>
          <th>{{$t('app.amount')}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td class="date">{{ formatDate(transaction.timestamp) }}</td>
          <td class="from-to">
            <ArrowUp class="from-to__to" v-if="transaction.to"/>
            <ArrowDown class="from-to__from" name="arrow-down" v-else-if="transaction.from"/>
            <a href="#">{{ (transaction.to || transaction.from).name }}</a>
          </td>
          <td class="amount">
            {{ transaction.amount }}
            <Ton/>
          </td>
        </tr>
        </tbody>
      </table>

      <p class="no-transactions" v-else>{{$t('app.no_transactions')}}</p>
    </section>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import dayjs from 'dayjs'
import Ton from '@/assets/icons/ton.svg'
import ArrowUp from '@/assets/icons/arrow-up.svg'
import ArrowDown from '@/assets/icons/arrow-down.svg'
import { addMoneyToApp, withdrawMoneyFromApp } from '../../api'

export default {
  name: 'Wallet',
  components: {
    Ton,
    ArrowUp,
    ArrowDown,
  },
  props: {
    app: {
      required: true,
    },
  },
  setup(props) {
    const { app } = toRefs(props)

    const addFunds = () => {
      addMoneyToApp(app.value.id, 100)
    }

    const withdraw = () => {
      withdrawMoneyFromApp(app.value.id, 100)
    }

    // I have no idea what the format should be :(
    const transactions = [
      {
        id: 0,
        timestamp: 1638868441899,
        from: {
          name: 'User 1',
          id: 12345,
        },
        to: null,
        amount: 50,
      },
      {
        id: 1,
        timestamp: 1638867403786,
        from: null,
        to: {
          name: 'User 2',
          id: 54321,
        },
        amount: 100,
      },
      {
        id: 2,
        timestamp: 1638668416900,
        from: {
          name: 'User 3',
          id: 9853,
        },
        to: 0,
        amount: 150,
      },
      {
        id: 3,
        timestamp: 1638368430968,
        from: null,
        to: {
          name: 'User 8',
          id: 8888,
        },
        amount: 50,
      },
    ]

    const formatDate = (date) => dayjs(date)
      .format('MMM DD, YYYY HH:mm')

    return {
      addFunds,
      withdraw,
      transactions,
      formatDate,
    }
  },
}
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
      color text-secondary

  table
    .date
      color text-secondary

    .from-to
      svg
        margin-right 8px

      &__to
        color error

      &__from
        color success

  .no-transactions
    text-align center
    color text-secondary
</style>
