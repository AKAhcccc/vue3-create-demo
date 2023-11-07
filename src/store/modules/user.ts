// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录请求接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// 引入数据类型
import type { userState } from './types'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入常量路由，以及异步路由、任意路由
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
// 引入项目中的路由文件
import router from '@/router'
// 引入深拷贝方法
// @ts-expect-error This type is incorrect because <reason for ignoring the error>
import cloneDeep from 'lodash/cloneDeep'

// 定义filterAsyncRoute函数，用于过滤当前用户需要展示的异步路由。它根据传入的异步路由和需要展示的路由名称进行筛选，并递归处理子路由。
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        // 递归
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 该小仓库的初始状态包括用户的唯一标识token、
  // 菜单路由menuRoutes、用户名username、
  // 头像avatar和按钮权限buttons等信息。
  state: (): userState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      // 存储按钮权限
      buttons: [],
    }
  },
  //处理异步|逻辑
  // 在actions中定义了三个方法：
  // userLogin用于处理用户登录逻辑，
  // userInfo用于获取用户详情信息，
  // userLogout用于处理用户退出登录逻辑。
  actions: {
    // 用户登录方法
    // // userLogin方法首先发送登录请求，并根据返回结果判断登录是否成功。
    // 如果登录成功，将返回的token存储到仓库中，并使用SET_TOKEN方法将token存储到本地持久化。
    // 如果登录失败，将返回一个带有错误信息的失败的Promise。
    async userLogin(data: loginFormData) {
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      // 请求200 -> token
      if (result.code == 200) {
        // 由于pinia存储数据利用js对象
        this.token = result.data as string
        // 本地存储持久化
        SET_TOKEN(result.data as string)
        // 保证当前async函数 返回一个成功的promise
        return 'ok'
      } else {
        // 请求201, -> 登录失败错误的信息
        return Promise.reject(new Error(result.message))
      }
    },

    // 获取用户详情信息
    // userInfo方法用于获取用户详情信息，并将信息存储到仓库中。
    // 如果获取用户信息成功，将用户名、头像和按钮权限等信息存储到仓库中，并计算当前用户需要展示的异步路由。
    // 然后将异步路由添加到菜单路由中，并使用router.addRoute方法将异步路由添加到路由器中。最后，返回一个成功的Promise。
    async userInfo() {
      // 获取用户的信息，存储于仓库当中，[头像，名字]
      const result: userInfoResponseData = await reqUserInfo()
      // 如果获取用户信息成功，存储一下用户信息
      if (result.code === 200) {
        console.log(result, 'result11')

        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        // 计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asyncRoute),
          result.data.routes,
        )
        // 菜单的数据
        this.menuRoutes = [
          ...constantRoute,
          ...userAsyncRoute,
          anyRoute,
          anyRoute,
        ]
        // 目前路由器管理的只有常量路由：用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录
    // userLogout方法用于处理用户退出登录逻辑。
    // 发送退出登录请求，并根据返回结果判断退出登录是否成功。
    // 如果退出登录成功，将清空仓库中的token、用户名和头像信息，并使用REMOVE_TOKEN方法从本地存储中移除token。
    // 最后，返回一个成功的Promise。
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        console.log(result, 'result123')
        ;(this.token = ''), (this.username = ''), (this.avatar = '')
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
