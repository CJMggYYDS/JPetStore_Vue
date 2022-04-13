import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)




const routes = [
  {
    name:'首页',
    path: '/',
    title: 'JPetStore',
    component: ()=> import ('../views/index.vue')
  },
  {
    name: '商品',
    path: '/item',
    component: ()=> import ('../views/items/item.vue')
  },
  {
    name: '详细',
    path: '/item/detail',
    component: ()=> import ('../views/items/detail.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
