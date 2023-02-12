import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './icons/index'
import '@/permission' // permission control

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
