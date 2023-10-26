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
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据
  state: (): userState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
      // 存储按钮权限
      buttons:[]
    }
  },
  //处理异步|逻辑
  actions: {
    // 用户登录方法
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
    async userInfo() {
      // 获取用户的信息，存储于仓库当中，[头像，名字]
      const result: userInfoResponseData = await reqUserInfo()
      // 如果获取用户信息成功，存储一下用户信息
      if (result.code === 200) {
        console.log(result,"result11");
        
        this.username = result.data.name
        this.avatar = result.data.avatar
        // 计算当前用户需要展示的异步路由
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute),result.data.routes)
        // 菜单的数据
        this.menuRoutes = [...constantRoute,...userAsyncRoute,anyRoute,anyRoute];
        // 目前路由器管理的只有常量路由：用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute,anyRoute].forEach((route:any) => {
          router.addRoute(route)
        })
        console.log(router.getRoutes(),'routes');
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        console.log(result, 'result123')
          ; (this.token = ''), (this.username = ''), (this.avatar = '')
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
