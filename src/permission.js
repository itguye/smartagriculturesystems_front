import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken} from '@/utils/auth' // 验权
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 加载进度
  // 判断是否有Token信息
  if (getToken()) {
    console.log("已经登入了")
    // 表示当前Token存在,判断一下to.path的路径是否为/login
    if (to.path === '/login') {
      next({ path: '/' })// 表示通往登入界面,但是当前已经登入了,直接前往首页
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      console.log("不进入登入界面")
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          let menus=res.data.menus;
          let username=res.data.username;
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true })
          })

        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        if(to.matched.length === 0 ){
          store.dispatch('GetInfo').then(res => { // 拉取用户信息
            let menus=res.data.menus;
            let username=res.data.username;
            // 将图片保存到
            store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({ ...to, replace: true })
            })
          })
        }else{
          next()
        }
       
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
