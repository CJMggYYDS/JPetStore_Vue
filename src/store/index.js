import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,   //后端给的token令牌
    username: null, //当前登录用户的用户名
    isSigned: false,  //是否登录

  },
  getters: {
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },

    setUsername: (state, username) => {
      state.username = username
    },

    changeIsSigned: (state, status) => {
      state.isSigned = status
    }
  },
  actions: {
  },
  modules: {
  }
})
