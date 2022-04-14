import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index.js'

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
    path: '/',
    title: 'JPetStore',
    meta: {
      title: '首页'
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
    hidden: true,
    meta: {
      title: '用户信息',
      requireLogin: true
    },
    component: () => import('../views/account/AccountInfo.vue')
  },

  {
    name: '详情',
    path: '/item/detail',
    meta: {
      title: '商品信息'
    },
    component: ()=> import ('../views/items/detail.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const store = Store;
router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.requireLogin) {
    if (store.state.token && store.state.isSigned) {
      next();
    }
    else {
      next('/signin');
    }
  }
  next();
})

export default router
