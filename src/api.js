import store from '@/store';
import router from './router';

export function setUserTelegramData(data) {
  store.dispatch('setUserTelegramData', data).then(() => {
    if (!store.getters.user?.account.firstName) {
      store.dispatch('setUserAccountInfo', {
        firstName: data.first_name,
        lastName: data?.last_name,
      });
    }
  })
}

export function getUser() {
  return store.getters.user;
}

export function logOut() {
  store.dispatch('logOut');
  router.push('/');
}
