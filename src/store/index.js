import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tab  from './modules/tab'
import getters from './getters'
import devices from './modules/devices'
//引入vuex-persistedstate
import createPersistedState from 'vuex-persistedstate'
import sensor from './modules/sensor'
import permission from './modules/permission'
Vue.use(Vuex)


// 创建Vuex
const store = new Vuex.Store({
  modules: {
    user,
    tab,
    devices,
    sensor,
    permission
  },
  getters,
  //配置vuex-persistedstate
  plugins: [createPersistedState(
  	//配置将vuex的状态储存到sessionStorage中（默认储存到localStorage中）
    { storage: window.sessionStorage }
  )]
})

export default store