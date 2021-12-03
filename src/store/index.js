import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    apps: [],
  },
  getters: {
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
    CLEAR_USER_DATA(state) {
      state.user = null;
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
    logOut({ commit }) {
      commit('CLEAR_USER_DATA');
    },
    addNewApp({ commit }, app) {
      commit('ADD_APP', app);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
