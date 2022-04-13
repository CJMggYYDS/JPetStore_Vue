import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    token: null,   //后端给的token令牌
    username: null, //当前登录用户的用户名
    isSigned: false,  //是否登录

    account : {
        firstName: '1',
        lastName: '1',
        addr1: '1',
        addr2: '1',
        city: '1',
        state: '1',
        zip: '1',
        country: '1',    
    },
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
    shipping: [],

  },
  getters: {
    shippingTotal: state=>{
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

    setUsername: (state, username) => {
      state.username = username
    },

    changeIsSigned: (state, status) => {
      state.isSigned = status
    },
    getAllCartItems:(state , allCartItems)=>{
     state.allCartItems = allCartItems
    },
    getShopping:(state, shipping)=>{
      state.shipping = shipping
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
