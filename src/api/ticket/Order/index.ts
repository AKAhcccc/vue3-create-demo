import request from '@/utils/request'
// 通过枚举声明对象，可以提高代码的可读性、可维护性和可靠性，同时减少错误赋值的可能性。
enum API {
  //获取数据
  GETORDERLIMIT_URL = 'http://localhost:8888/api/ticket/stop',
}

// 获取用户信息并分页
export const getStopList = (obj: any) => {
  return request.post<any, any>(API.GETORDERLIMIT_URL, {
    body: {
      obj,
    },
  })
}
