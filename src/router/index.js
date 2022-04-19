import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index.js'

import cartView from '../views/cart/cart'
import newOrder from '../views/order/newOrder.vue'
import orderView from '../views/order/order'
import lineOrder from '../views/order/lineOrder'
import orderDetail from '../views/order/orderDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: '登录',
    hidden: true,
    meta: {
      title: '登录'
    },
    component: () => import('../views/account/SignInForm.vue')
  },
  {
    name:'首页',

    path: '/',
    meta: {
      title: 'JPetStore 首页'
    },

    component: ()=> import ('../views/index.vue')
  },
  {
    name: '商品',
    path: '/item',
    meta: {
      title: '商品列表'
    },
    component: ()=> import ('../views/items/item.vue')
  },

  {
    path: '/register',
    name: '注册',
    hidden: true,
    meta: {
      title: '用户注册'
    },
    component: () => import('../views/account/RegisterForm.vue')
  },

  {
    path: '/user',
    name: '用户信息',
    title: '用户信息',
    hidden: true,
    meta: {
      requireLogin: true,
      title: '用户信息'

    },
    component: () => import('../views/account/AccountInfo.vue')
  },

  {
    name: '详情',
    path: '/item/detail',

    meta:{
      title: '商品详情'
    },
    component: ()=> import ('../views/items/detail.vue')
  },
  {
    path: '/cart',
    meta: {
      requireLogin: true,
      title: '购物车'

    },
    component : cartView
  },
  {
    path: '/newOrder',
    meta: {
      requireLogin: true,
      title: '提交订单'

    },
    component : newOrder
  },
  {
    path: '/order',
    meta: {
      requireLogin: true,
      title: '订单'

    },
    component : orderView
  },
  {
    path: '/lineOrder',
    meta: {
      requireLogin: true,
      title: '我的订单'

    },
    component : lineOrder
  },
  {
    path: '/orderDetail',
    meta: {
      requireLogin: true,
      title: '我的订单'

    },
    component : orderDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


const store = Store;
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  if(to.meta.requireLogin) {
    if(store.state.token && store.state.isSigned) {
      next();
    }
    else{
      next('/signin');
    }
  }
  next();
})
export default router
