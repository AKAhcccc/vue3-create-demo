// 路由鉴权 某一个路由什么条件下能访问，什么情况下不能访问
import router from '@/router'
// 引用进度条包及其样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 获取大仓库
import pinia from './store/index'
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
const userStore = useUserStore(pinia)
console.log(userStore)

// 全局守卫:项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach((to: any, from: any, next: any) => {
  // 访问某一个路由之前的守卫
  // to:将要访问那个路由 是个路由对象
  // from从那个路由而来
  // next:路由的放行函数
  NProgress.start()
  next()
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  NProgress.done()
})

// 第一个问题:任意路由切换实现进度条业务 通过progress包实现
// 第二个问题:路由鉴权(路由组件访问权限的设置)
// 全部理由组件：登录、404、首页、任意路由、数据大屏、权限管理(三个子路由)、商品管理（四个子路由）

// 用户未登录可以访问login，其余路由不能访问login
// 用户登录成功：不可以访问login，当访问login时，让他指向首页。

export default router
