import Vue from 'vue'
import VueRouter from 'vue-router'
<<<<<<< Updated upstream

=======
import cartView from '../views/cart'
import newOrder from '../views/newOrder.vue'
import orderView from '../views/order'
import lineOrder from '../views/lineOrder'
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
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
    path: '/lineItem',
    component : lineOrder
  }
>>>>>>> Stashed changes
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

export default router
