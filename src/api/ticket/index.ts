import request from "@/utils/request";
import { } from './type'

enum API {
    // 获取基本数据
    GETLIST_URL = '/ticket/getList',
    // 分页接口
    GETTICKETDATA_URL = '/ticket/trainManagement',
    // 根据时间筛选数据
    FILTERTIME_URL = '/ticket/time',
    // 筛选数据
    SELECTTICKET_URL = '/ticket/select'
}
// 获取基本数据
export const getList = () => request.get<any,any>(API.GETLIST_URL)

// 分页接口
export const reqTicket = (arr1: number, arr2: number) => {
    return request.get<any, any>(API.GETTICKETDATA_URL, {
        params: {
            arr1: arr1,
            arr2: arr2
        }
    })
}
// 根据时间筛选数据
export const filterTime = (time1: string, time2: string) => {
    return request.get<any, any>(API.FILTERTIME_URL, {
        params: {
            time1: time1,
            time2: time2
        }
    })
}

export const SelectTicket = (data: string) => {
    return request.post<any, any>(API.SELECTTICKET_URL, {
        body: {
            data: data
        }
    })
}