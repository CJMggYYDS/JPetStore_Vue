import Vue from 'vue'
import VueRouter from 'vue-router'


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
