import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {
      username: '',
      id: 0
    }
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    updateUser(state, user) {
      state.user = user
    }
  },
  actions: {
    asyncUpdateUser(context, user) {
      context.commit('updateUser', user)
    }
  },
  modules: {
  }
})
