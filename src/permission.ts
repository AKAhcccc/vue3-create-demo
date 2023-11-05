// 路由鉴权 某一个路由什么条件下能访问，什么情况下不能访问
import router from '@/router'
// 引用进度条包及其样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })
// 引入setting组件
import setting from './setting'
// 获取大仓库
import pinia from './store/index'
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)

// 全局守卫:项目当中任意路由切换都会触发的钩子
// 全局前置守卫
// 在全局前置守卫中，首先获取用户的token和username，用来判断用户是否已经登录。
// 如果已登录，就会执行一系列判断逻辑：
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} -- ${to.meta.title}`
  // 访问某一个路由之前的守卫
  // to:将要访问那个路由 是个路由对象
  // from从那个路由而来
  // next:路由的放行函数
  console.log(from)
  NProgress.start()
  // 获取token 判断用户是否登录
  const token = userStore.token
  // 用户名字
  const username = userStore.username
  // 用户登录判断

  if (token) {
    // 登录成功，访问login不能访问，指向home
    // 如果将要访问的路由是'/login'，则将其重定向到'/'，即首页。
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 登录成功访问其余六个路由
      // 用户信息
      // 否则，先判断是否有用户信息（即username）。如果有，则放行，允许访问当前路由。
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取用户信息
        // 如果没有用户信息，则通过异步操作获取用户信息，并在获取成功后放行。
        try {
          // 获取用户信息
          await userStore.userInfo()
          // 放行
          // 万一刷新的时候是异步路由，有可能获取到了用户信息，但是异步路由还未加载完毕，会出现空白效果
          next({ ...to })
        } catch (error) {
          // 退出登录 -> 用户相关的数据清空
          // 如果获取用户信息失败（例如token过期），则触发用户退出登录的操作，
          userStore.userLogout()
          // 并将路由重定向到'/login'，同时传递了一个redirect参数，
          // 用于在登录成功后重新跳转到原来要访问的路由。
          // 则触发用户退出登录的操作，清空用户相关数据，
          next({ path: '/login', query: { redirect: to.path } })
          console.error(error)
        }
      }
    }
    // 如果用户未登录，则有以下判断逻辑：
  } else {
    // 如果将要访问的路由是'/login'，则直接放行，允许访问。
    if (to.path === '/login') {
      next()
      // 否则，将路由重定向到'/login'，
      // 同时传递一个redirect参数，用于在登录成功后重新跳转到原来要访问的路由。
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  next()
})

// 全局后置守卫
router.afterEach(() => {
  NProgress.done()
})
// 第一个问题:任意路由切换实现进度条业务 通过progress包实现
// 第二个问题:路由鉴权(路由组件访问权限的设置)
// 全部理由组件：登录、404、首页、任意路由、数据大屏、权限管理(三个子路由)、商品管理（四个子路由）

// 用户未登录可以访问login，其余路由不能访问login
// 用户登录成功：不可以访问login，当访问login时，让他指向首页。

export default router
