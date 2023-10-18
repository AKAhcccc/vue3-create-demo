// 书写品牌管理模块
import request from '@/utils/request'
import type { TradeMarkRecordsData,TradeMark } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加数据
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除接口定义
  TRADEMARKDELETE_URL = '/admin/product/baseTrademark/remove/'
}
// 获取已有品牌的接口方法
// page:获取第几页数据
// limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkRecordsData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data:TradeMark) => {
  // 修改已有品牌的数据
  if(data.id){
    // 修改
    return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
  }else {
    // 新增
    return request.post<any,any>(API.ADDTRADEMARK_URL,data)
  }
}
// 删除某一个已有品牌的数据
export const reqDeleteTrademark = (id:number) => request.delete<any,any>(API.TRADEMARKDELETE_URL + id)