import request from '@/utils/request'

// 通过枚举声明对象，可以提高代码的可读性、可维护性和可靠性，同时减少错误赋值的可能性。
// 通过枚举定义对象
enum API {
  // 获取ticket表单数据
  GETTICKETLIST_URL = 'http://localhost:8888/api/ticket/ticketItem',
  // 通过ticket表单的ID与dalaohu的Uid进行多表联查
  GETTICKETJOINT_URL = 'http://localhost:8888/api/ticket/ticketJoint',
  // 依据日期筛选
  GETTICKETTIME_UTL = 'http://localhost:8888/api/ticket/ticketTime',
  // 下拉筛选
  GETSELECT_URL = 'http://localhost:8888/api/ticket/ticketSelect',
  // 删除接口
  TICKETREMOVE_URL = 'http://localhost:8888/api/ticket/ticketRemove',
  // 新增接口
  ADDTICKETLIST_URL = 'http://localhost:8888/api/ticket/ticketAddList',
  //编辑接口
  UPDATETICKETLIST_URL = 'http://localhost:8888/api/ticket/ticketUpdateList',
}

// 获取数据对象
export const getTicketItem = (obj: any) => {
  return request.post<any, any>(API.GETTICKETLIST_URL, {
    body: {
      obj,
    },
  })
}
// 获取详情信息
export const getTicketJoint = (id: string) => {
  return request.post<any, any>(API.GETTICKETJOINT_URL, {
    body: {
      id,
    },
  })
}
// 获取日期筛选数据
export const getTicketSearch = (data1: number, data2: number) => {
  return request.post<any, any>(API.GETTICKETTIME_UTL, {
    body: {
      data1,
      data2,
    },
  })
}
// 执行下拉筛选
export const getSelect = (str: any) => {
  return request.post<any, any>(API.GETSELECT_URL, {
    body: {
      str,
    },
  })
}
// 删除数据接口
export const TicketDelete = (id: string) => {
  return request.delete<any, any>(API.TICKETREMOVE_URL, {
    params: {
      id,
    },
  })
}
// 新增数据接口
export const addTicketList = (arr: any) => {
  return request.post<any, any>(API.ADDTICKETLIST_URL, {
    body: {
      arr,
    },
  })
}
// 修改数据接口
export const upDataTicket = (arr: any) => {
  return request.put<any, any>(API.UPDATETICKETLIST_URL, {
    body: {
      arr,
    },
  })
}
