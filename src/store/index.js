import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    token: null,   //后端给的token令牌
    account:null,  //用户
    isSigned: false,  //是否登录

    shipAddr:{
      shipFirstName: '1',
      shipLastName: '1',
      shipAddr1: '1',
      shipAddr2: '1',
      shipCity: '1',
      shipState: '1',
      shipZip: '1',
      shipCountry: '1',
    },
    shipToDifferentAddr: false,
    orderInfo : null,
    allCartItems: [],
    shopping: [],

  },
  getters: {
    shoppingTotal: state=>{
      let total = 0;
      for(let item of state.shipping){
        total += item.total;
      }
      return total;
    }

    
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

    getAllCartItems:(state , allCartItems)=>{
     state.allCartItems = allCartItems
    },
    getShopping:(state, shopping)=>{
      state.shopping = shopping
    },
    getOrderInfo: (state , orderInfo)=>{
      state.orderInfo = orderInfo

    }

  },
  actions: {
  },
  modules: {
  }
})
