import Vue from 'vue'
import VueRouter from 'vue-router'
import cartView from '../views/cart/cart'
import newOrder from '../views/order/newOrder.vue'
import orderView from '../views/order/order'
import lineOrder from '../views/order/lineOrder'
Vue.use(VueRouter)

const routes = [
  {
    path: '/signin',
    name: '登录',
    hidden: true,
    meta: {
      title: '用户登录'
    },
    component: () => import('../views/account/SignInForm.vue')
  },
  {
    name:'首页',
    path: '/home',
    title: 'JPetStore',
    component: ()=> import ('../views/index.vue')
  },
  {
    name: '商品',
    path: '/item',
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
    hidden: true,
    meta: {
      title: '用户信息'
    },
    component: () => import('../views/account/AccountInfo.vue')
  },

  {
    name: '详细',
    path: '/item/detail',
    component: ()=> import ('../views/items/detail.vue')
  },
  {
    path: '/',
    component : cartView
  },
  {
    path: '/cart',
    component : cartView
  },
  {
    path: '/newOrder',
    component : newOrder
  },
  {
    path: '/order',
    component : orderView
  },
  {
    path: '/lineOrder',
    component : lineOrder
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})
export default router
