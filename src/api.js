import store from '@/store';

export function setUserTelegramData(data) {
  store.dispatch('setUserTelegramData', data)
}

export function getUser() {
  return store.getters.user
}
