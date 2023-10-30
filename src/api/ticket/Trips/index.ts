import request from '@/utils/request'

enum API {
  // 分页接口
  GETTICKETDATA_URL = '/ticket/trainManagement',
  // 根据时间筛选数据
  FILTERTIME_URL = '/ticket/time',
  // 筛选数据
  SELECTTICKET_URL = '/ticket/select',
  // 启用筛选
  HANDLEOK_URL = '/ticket/handle',
  // 搜索接口
  SearchIPT_URL = '/ticket/search',
  // 新增接口
  ADDTICKET_URL = '/ticket/addlist',
  // 更新接口
  UPDATALIST_URL = '/ticket/updata',
  // 删除接口
  DELECTTICKETLIST_URL = '/ticket/delect',
}
// 分页接口
export const reqTicket = (arr1: number, arr2: number) => {
  return request.get<any, any>(API.GETTICKETDATA_URL, {
    params: {
      arr1: arr1,
      arr2: arr2,
    },
  })
}
// 根据时间筛选数据
export const filterTime = (time1: string, time2: string) => {
  return request.get<any, any>(API.FILTERTIME_URL, {
    params: {
      time1: time1,
      time2: time2,
    },
  })
}
// 根据下拉列表进行筛选
export const SelectTicket = (data: string) => {
  return request.post<any, any>(API.SELECTTICKET_URL, {
    body: {
      data: data,
    },
  })
}
// 状态按钮接口
export const handleOK = (flag: boolean) => {
  return request.post<any, any>(API.HANDLEOK_URL, {
    body: {
      flag: flag,
    },
  })
}
// 搜索接口
export const SearchTicket = (inputEmits: string) => {
  return request.post<any, any>(API.SearchIPT_URL, {
    body: {
      inputEmits: inputEmits,
    },
  })
}

// 新增内部数据接口
export const AddTicket = (AddOrUpDataTicketItem: any) => {
  if (AddOrUpDataTicketItem.id) {
    // 如果前端返回ID则是更新接口
    return request.put<any, any>(API.UPDATALIST_URL, {
      body: {
        data: AddOrUpDataTicketItem,
      },
    })
  } else {
    // 如果前端未返回ID则是新增接口
    return request.post<any, any>(API.ADDTICKET_URL, {
      body: {
        data: AddOrUpDataTicketItem,
      },
    })
  }
}

// 删除接口
export const DelectTiain = (id: string) => {
  return request.delete(API.DELECTTICKETLIST_URL, {
    params: {
      id: id,
    },
  })
}
