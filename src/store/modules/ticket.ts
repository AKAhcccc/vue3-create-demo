// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 数据请求接口
import { reqTicket } from '@/api/ticket/Trips/index'

const useTicketStore = defineStore('Ticket', {
  // 小仓库存储数据
  state: (): any => {
    return {
      data: '',
    }
  },
  // 处理异步请求|逻辑
  actions: {
    async getTicket() {
      const result: any = await reqTicket(1, 10)
      if (result.code === 200) {
        this.data = result.data
      }
    },
  },
})

export default useTicketStore
