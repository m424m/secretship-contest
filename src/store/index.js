import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    apps: [],
  },
  getters: {
    // user: (state) => ({
    //   telegram: {
    //     ...state.user?.telegram,
    //     full_name: `${state.user?.telegram.first_name} ${state.user?.telegram.last_name}`.trim(),
    //   },
    //   account: {
    //     ...state.user?.account,
    //     full_name: `${state.user?.account.firstName} ${state.user?.telegram.lastName}`.trim(),
    //   },
    // }),
    user: (state) => state.user,
    apps: (state) => state.apps,
  },
  mutations: {
    SET_USER_TG_DATA(state, data) {
      state.user = {
        ...state.user,
        telegram: data,
      };
    },
    SET_USER_ACCOUNT_INFO(state, data) {
      state.user = {
        ...state.user,
        account: data,
      };
    },
    ADD_APP(state, app) {
      state.apps = [...state.apps, app];
    },
  },
  actions: {
    setUserTelegramData({ commit }, data) {
      commit('SET_USER_TG_DATA', data);
    },
    setUserAccountInfo({ commit }, data) {
      commit('SET_USER_ACCOUNT_INFO', data);
    },
    addNewApp({ commit }, app) {
      commit('ADD_APP', app);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
