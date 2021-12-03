import store from '@/store';
import router from './router';

export function setUserTelegramData(data) {
  return store.dispatch('setUserTelegramData', data)
    .then(() => {
      if (!store.getters.user.account) {
        store.dispatch('setUserAccountInfo', {
          firstName: data.first_name,
          lastName: data?.last_name || null,
        });
      }
    });
}

export function setUserAccountInfo(data) {
  return store.dispatch('setUserAccountInfo', data);
}

export function getUser() {
  return store.getters.user;
}

export function createApp(data) {
  return store.dispatch('addNewApp', data);
}

export function logOut() {
  return store.dispatch('logOut')
    .then(() => {
      router.push('/');
    });
}
