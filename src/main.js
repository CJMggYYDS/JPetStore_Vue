import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(ElementUI)

// axios.defaults.baseURL = 'http://localhost:8081'
// axios.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem('token')
//   if (token) {
//     config.headers.accessToken = token
//     return config
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
