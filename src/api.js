import store from '@/store';

export function setUserData(data) {
  store.dispatch('setUserData', data)
}

export function getUserData() {
  return store.state.user
}
