import store from '@/store'
import router from './router'

export function setUserTelegramData(data) {
  return store.dispatch('setUserTelegramData', data)
    .then(() => {
      if (!store.getters.user.account) {
        store.dispatch('setUserAccountInfo', {
          firstName: data.first_name,
          lastName: data?.last_name || null,
        })
      }
    })
}

export function setUserAccountInfo(data) {
  return store.dispatch('setUserAccountInfo', data)
}

export function getUser() {
  return store.getters.user
}

export function createApp(data) {
  return store.dispatch('addNewApp', {
    ...data,
    balance: 100,
    created: Date.now(),
  })
}

export function getApps() {
  return store.getters.apps
}

export function getApp(id) {
  return store.getters.app(id)
}

export function addMoneyToApp(id, amount) {
  return store.dispatch('changeAppBalance', {
    id,
    amount: Math.abs(amount),
  })
}

export function withdrawMoneyFromApp(id, amount) {
  return store.dispatch('changeAppBalance', {
    id,
    amount: -Math.abs(amount),
  })
}

export function logOut() {
  return store.dispatch('logOut')
    .then(() => {
      router.push('/')
    })
}
