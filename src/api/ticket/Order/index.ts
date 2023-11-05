import request from '@/utils/request'
// 通过枚举声明对象，可以提高代码的可读性、可维护性和可靠性，同时减少错误赋值的可能性。
enum API {
  //获取数据
  GETORDERLIMIT_URL = 'http://localhost:8888/api/ticket/orderList',
  // 下拉接口1
  ORDERLISTSELECT1_URL = 'http://localhost:8888/api/ticket/orderSelect1',
  // 下拉接口2
  ORDERLISTSELECT2_URL = 'http://localhost:8888/api/ticket/orderSelect2',
  // 日期筛选
  ORDERSTIMESEATCHLIST_URL = 'http://localhost:8888/api/ticket/orderSearchTimeList',
}

// 获取用户信息并分页
export const getOrderItem = (obj: any) => {
  return request.post<any, any>(API.GETORDERLIMIT_URL, {
    body: {
      obj,
    },
  })
}
// 下拉接口1
export const OrderListSelect1 = (str: any) => {
  return request.post<any, any>(API.ORDERLISTSELECT1_URL, {
    body: {
      str,
    },
  })
}
// 下拉接口2
export const OrderListSelect2 = (str: any) => {
  return request.post<any, any>(API.ORDERLISTSELECT2_URL, {
    body: {
      str,
    },
  })
}
// 根据日期筛选
export const getOrderTimeSearch = (date1: any, date2: any) => {
  return request.post<any, any>(API.ORDERSTIMESEATCHLIST_URL, {
    body: {
      date1,
      date2,
    },
  })
}
