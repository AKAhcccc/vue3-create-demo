// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录请求接口
import { reqLogin, reqUserInfo } from '@/api/user/index'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { userState } from './types'
// 引入外部路由
import { constantRoute } from '../../router/routes'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据
  state: (): userState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  //处理异步|逻辑
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
      console.log(data)
      // 登录请求
      const result: loginResponseData = await reqLogin(data)
      // 请求200 -> token
      if (result.code === 200) {
        // 由于pinia存储数据利用js对象
        this.token = result.data.token as string
        // 本地存储持久化
        SET_TOKEN(result.data.token as string)
        // 保证当前async函数 返回一个成功的promise
        return 'ok'
      } else {
        // 请求201, -> 登录失败错误的信息
        return Promise.reject(new Error(result.data.message))
      }
    },

    // 获取用户详情信息
    async userInfo() {
      // 获取用户的信息，存储于仓库当中，[头像，名字]
      const result = await reqUserInfo()
      console.log(result.data, 'result')
      // 如果获取用户信息成功，存储一下用户信息
      if (result.code === 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      }
    },

    // 退出登录
    async userLogout() {
      ;(this.token = ''), (this.username = ''), (this.avatar = '')
      REMOVE_TOKEN()
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
