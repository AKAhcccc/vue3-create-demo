// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据
  state: () => {
    return {}
  },
  //处理异步|逻辑
  actions: {
    userLogin() {
      console.log(123)
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
