import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
Vue.use(VueRouter)


export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '/',
    name:"main",
    component: Main,
    redirect: '/datapresentaion',
  }
]


// 动态生路由
export const asyncRouterMap = [
  {
    name:'datapresentaion',
    path: '/datapresentaion',
    redirect:'/datapresentaion/datapresentaion',
    component:Main,
    meta:{title:'数据展示',icon:'el-icon-s-data',sort:0},
    children: [{
      path:'datapresentaion',
      name:'datapresentaion',
      component: () => import('@/views/datapresentation/index'),
      meta:{title:'数据展示',icon:'el-icon-s-data',sort:0},
    }]
  },
  {
    name:'deviceaccess',
    path:'/deviceaccess',
    redirect:'/deviceaccess/deviceaccess',
    component:Main,
    meta:{title:'MQTT服务器',icon:'el-icon-cpu',sort:0},
    children: [{
      path:'deviceaccess',
      name:'deviceaccess',
      component:() => import('@/views/deviceaccess/index'),
      meta:{title:'MQTT服务器',icon:'el-icon-cpu',sort:0},
    }]
  },{
    name:'devicepolicies',
    path:'/devicepolicies',
    redirect:'/devicepolicies/devicepolicies',
    component:Main,
    meta:{title:'设备策略',icon:'el-icon-s-help',sort:0},
    children: [{
      path:'devicepolicies',
      name:'devicepolicies',
      component:()=>import('@/views/devicepolicies/index'),
       meta:{title:'设备策略',icon:'el-icon-s-help',sort:0},
    }]
  },{
    name:'usermanagemen',
    path:'/usermanagemen',
    redirect:'/usermanagemen/useroperate',
    component:Main,
    meta:{title:'用户管理',icon:'el-icon-user-solid',sort:0},
    children: [{
      path:'useroperate',
      name:'useroperate',
      component:()=>import('@/views/usermanagemen/index'),
      meta:{title:'操作用户',icon:'el-icon-user-solid',sort:0},
    },{
      path:'info',
      name:'info',
      component:()=>import('@/views/usermanagemen/info/index'),
      meta:{title:'个人信息',icon:'postcard',sort:0},
    }]
  }
   ,{path: '*', redirect: '/404', hidden: true},
]






export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:constantRouterMap
})

