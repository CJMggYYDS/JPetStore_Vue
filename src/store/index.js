import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    token: null,   //后端给的token令牌
    account:null,  //用户
    isSigned: false,  //是否登录

    shipAddr:{
      shipFirstName: '',
      shipLastName: '',
      shipAddr1: '',
      shipAddr2: '',
      shipCity: '',
      shipState: '',
      shipZip: '',
      shipCountry: '',
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
    getAddr: (state, shipAddr) => {
      state.shipAddr= shipAddr
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
