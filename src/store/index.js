import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    user: null,
    apps: [],
  },
  getters: {
    user: (state) => state.user,
    apps: (state) => state.apps,
    app: (state) => (id) => state.apps.find((app) => app.id === id),
  },
  mutations: {
    SET_USER_TG_DATA(state, data) {
      state.user = {
        ...state.user,
        telegram: data,
      }
    },
    SET_USER_ACCOUNT_INFO(state, data) {
      state.user = {
        ...state.user,
        account: data,
      }
    },
    CLEAR_USER_DATA(state) {
      state.user = null
      state.apps = []
    },
    ADD_APP(state, app) {
      state.apps = [...state.apps, app]
    },
    CHANGE_APP_BALANCE(state, data) {
      const app = state.apps.find((a) => a.id === data.id)
      app.balance = Math.max(app.balance + data.amount, 0)
    },
  },
  actions: {
    setUserTelegramData({ commit }, data) {
      commit('SET_USER_TG_DATA', data)
    },
    setUserAccountInfo({ commit }, data) {
      commit('SET_USER_ACCOUNT_INFO', data)
    },
    logOut({ commit }) {
      commit('CLEAR_USER_DATA')
    },
    addNewApp({
      commit,
      state,
    }, data) {
      const id = state.apps.length
      commit('ADD_APP', {
        ...data,
        id,
      })
      return { id }
    },
    changeAppBalance({ commit }, data) {
      commit('CHANGE_APP_BALANCE', data)
    },
  },
  modules: {},
  plugins: [createPersistedState()],
})
