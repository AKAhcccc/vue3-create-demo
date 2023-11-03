import request from '@/utils/request'

// 通过枚举声明对象，可以提高代码的可读性、可维护性和可靠性，同时减少错误赋值的可能性。
enum API {
  //   获取线路数据
  GETLINTLIST_URL = 'http://localhost:8888/api/lint/getlist',
  // 下拉筛选
  GETSELECT_URL = 'http://localhost:8888/api/line/select',
  // 日期
  LINETIME_URL = 'http://localhost:8888/api/line/time',
  // 删除
  LINEDATALE_URL = 'http://localhost:8888/api/line/delete',
  // 搜索接口
  LINESEARCH_URL = 'http://localhost:8888/api/line/search',
  // 新增接口
  LINEADDLIST_URL = 'http://localhost:8888/api/line/addlist',
  // 更新接口
  LINEUPDATA_URL = 'http://localhost:8888/api/line/updata',
}

// 获取数据、搜索、分页
export const getLintList = (obj: any) => {
  console.log(obj, 'obj')
  return request.post<any, any>(API.GETLINTLIST_URL, {
    body: {
      obj,
    },
  })
}

// 筛选数据
export const getSelect = (obj: any) => {
  console.log(obj, 'obj')
  return request.post<any, any>(API.GETSELECT_URL, {
    body: {
      obj,
    },
  })
}

// 根据时间筛选数据
export const filterTime = (time1: number, time2: number) => {
  return request.post<any, any>(API.LINETIME_URL, {
    body: {
      time1: time1,
      time2: time2,
    },
  })
}
// 删除
export const lineDatale = (id: number) => {
  return request.delete<any, any>(API.LINEDATALE_URL, {
    params: {
      id,
    },
  })
}

// 搜索
export const lineSearch = (key: any) => {
  return request.post<any, any>(API.LINESEARCH_URL, {
    body: {
      key,
    },
  })
}

// 新增
export const addLineList = (obj: any) => {
  return request.post<any, any>(API.LINEADDLIST_URL, {
    body: {
      obj,
    },
  })
}
// 修改
export const upDataLineList = (obj: any) => {
  return request.put<any, any>(API.LINEUPDATA_URL, {
    body: {
      obj,
    },
  })
}
