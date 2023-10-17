// 书写品牌管理模块
import request from "@/utils/request";
import type { TradeMarkRecordsData } from './type'
// 品牌管理模块接口地址
enum API {
    // 获取已有品牌接口
    TRADEMARK_URL = '/admin/product/baseTrademark/'
}
// 获取已有品牌的接口方法
// page:获取第几页数据
// limit：获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) => request.get<any, TradeMarkRecordsData>(API.TRADEMARK_URL + `${page}/${limit}`)