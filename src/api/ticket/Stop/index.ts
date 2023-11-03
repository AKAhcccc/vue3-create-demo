import request from '@/utils/request'

// 通过枚举声明对象，可以提高代码的可读性、可维护性和可靠性，同时减少错误赋值的可能性。
enum API {
  // 获取数据并分页
  GETSTOPLIST_URL = 'http://localhost:8888/api/ticket/stop',
  // 首字母筛选
  HANDLESELECT_URL = 'http://localhost:8888/api/ticket/select',
  // 新增
  ADDSTOPLIST_URL = 'http://localhost:8888/api/ticket/addStop',
  // 编辑
  EDITSTOPLIST_URL = 'http://localhost:8888/api/ticket/editStip',
  // 删除
  DELETESTOPLIST_URL = 'http://localhost:8888/api/ticket/delete',
}

// 获取用户信息并分页
export const getStopList = (obj: any) => {
  return request.post<any, any>(API.GETSTOPLIST_URL, {
    body: {
      obj,
    },
  })
}

// 获取按钮首字母，并且返回后端进行筛选
export const getSelect = (str: string) => {
  return request.post<any, any>(API.HANDLESELECT_URL, {
    body: {
      str,
    },
  })
}

// 新增接口
export const addStopList = (str: any) => {
  return request.post<any, any>(API.ADDSTOPLIST_URL, {
    body: {
      str,
    },
  })
}

// 编辑接口
export const EditStopList = (arr: any, obj: any) => {
  return request.put<any, any>(API.EDITSTOPLIST_URL, {
    body: {
      arr,
      obj,
    },
  })
}

// 删除接口
export const DelectStopList = (id: any) => {
  return request.delete<any, any>(API.DELETESTOPLIST_URL, {
    params: {
      id,
    },
  })
}
