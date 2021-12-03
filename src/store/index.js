import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    user: null,
    apps: [],
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.user = {
        ...state.user,
        data,
      };
    },
    ADD_APP(state, app) {
      state.apps = [...state.apps, app];
    },
  },
  actions: {
    setUserData({ commit }, data) {
      commit('SET_USER_DATA', data);
    },
    addNewApp({ commit }, app) {
      commit('ADD_APP', app);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
