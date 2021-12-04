<template>
  <div class="wallet">
    <section>
      <h4>Current app balance</h4>
      <div class="wallet__balance">
        <span class="wallet__balance-ton">{{ app.balance }} <Icon name="ton"/></span>
        <span class="wallet__balance-usd">(${{ app.balance * 3 }})</span>
      </div>
      <br>
      <div class="buttons">
        <button class="small" @click="addFunds">Add funds</button>
        <button class="small" @click="withdraw">Withdraw</button>
      </div>
    </section>
    <br>

    <section>
      <h4>Transaction history</h4>

      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>From / To</th>
          <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ formatDate(transaction.timestamp) }}</td>
          <td>
            <Icon name="arrow-up" v-if="transaction.to"/>
            <Icon name="arrow-down" v-else-if="transaction.from"/>
            <span>{{transaction.to || transaction.from}}</span>
          </td>
          <td>
            {{transaction.amount}} <Icon name="ton"/>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import dayjs from 'dayjs'
import Icon from '../../components/common/Icon.vue'
import { addMoneyToApp, withdrawMoneyFromApp } from '../../api'

export default {
  name: 'Wallet',
  components: { Icon },
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

    const transactions = [
      {
        id: 0,
        timestamp: Date.now(),
        from: '1234509876',
        to: null,
        amount: 50,
      },
      {
        id: 1,
        timestamp: Date.now() - 1000000,
        from: null,
        to: '99234729424',
        amount: 100,
      },
      {
        id: 2,
        timestamp: Date.now() - 200000000,
        from: '1234509876',
        to: 0,
        amount: 150,
      },
      {
        id: 3,
        timestamp: Date.now() - 500000000,
        from: null,
        to: '728347293423',
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
@import "~@/styles/vars.styl"

.wallet
  &__balance
    font-size 20px
    font-weight 500
    display flex
    align-items center
    gap 8px

    &-ton
      display flex
      align-items center
      gap 6px

    &-usd
      color text-secondary
</style>
