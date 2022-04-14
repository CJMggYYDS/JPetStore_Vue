import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    token: null,   //后端给的token令牌
    isSigned: false,  //是否登录\
    account:null  //用户
  },
  getters: {

  },
  mutations: {

    setToken: (state, token) => {
      state.token = token
    },

    setAccount: (state, account) => {
      state.account = account
    },

    changeIsSigned: (state, status) => {
      state.isSigned = status
    },
    
  },
  actions: {
  },
  modules: {
  }
})
