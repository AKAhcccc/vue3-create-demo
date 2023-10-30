import Ticket from '../data/Ticket.json'
let TicketList: any = []
export default [
  // 数据获取以及分页
  {
    url: '/api/ticket/trainManagement',
    method: 'get',
    response: (request) => {
      let { arr1, arr2 } = request.query
      console.log(arr1, arr2)
      const res = Ticket
      let page = arr1
      let limit = arr2
      let total = res.length
      TicketList = res.slice((page - 1) * limit, page * limit)
      if (res.length > 0) {
        return {
          code: 200,
          message: '获取成功',
          data: {
            data: TicketList,
            total: total,
            limit: limit,
          },
        }
      } else {
        return {
          code: 400,
          message: '获取失败',
        }
      }
    },
  },
  // 下拉菜单筛选
  {
    url: '/api/ticket/select',
    method: 'post',
    response: ({ body }) => {
      let res = Ticket
      const { data } = body.body
      TicketList = res.filter((item) => item.type === data)
      return {
        code: 200,
        data: TicketList,
        message: 'Success',
      }
    },
  },
  // 根据时间区间筛选
  {
    url: '/api/ticket/time',
    method: 'get',
    response: (request) => {
      let { time1, time2 } = request.query
      let data = Ticket
      // 首先将传入的时间参数转换为日期对象，
      // 并格式化为中国标准的日期字符串。然后，将日期字符串转换为时间戳，以便进行比较。
      const date1 = new Date(time1)
      const formattedDate1 = date1.toLocaleDateString('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const date2 = new Date(time2)
      const formattedDate2 = date2.toLocaleDateString('zh', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      const timestamp1 = Date.parse(formattedDate1)
      const timestamp2 = Date.parse(formattedDate2)
      let result: any = []
      if (timestamp1 > 0 && timestamp2 > 0) {
        data.forEach((item, index) => {
          let times = Date.parse(item.time)
          if (times >= timestamp1 && times <= timestamp2) {
            result.push(item)
          }
        })
      }
      return {
        code: 200,
        message: '依据日期筛选成功',
        data: result,
      }
    },
  },
  // 状态筛选
  {
    url: '/api/ticket/handle',
    method: 'post',
    response: ({ body }) => {
      let { flag } = body.body
      let data = Ticket
      TicketList = data.filter((item) => item.switch === flag)
      return {
        code: 200,
        data: TicketList,
        message: '状态获取成功',
      }
    },
  },
  // 搜索接口
  {
    url: '/api/ticket/search',
    method: 'post',
    response: ({ body }) => {
      let { inputEmits } = body.body
      let data = Ticket
      const result = data.filter((item) => {
        // 遍历数据源，找到包含关键词的数据项
        return Object.values(item).some((val) => {
          return String(val).includes(inputEmits)
        })
      })
      return {
        code: 200,
        data: result,
        message: '状态获取成功',
      }
    },
  },
  // 新增接口
  {
    url: '/api/ticket/addlist',
    method: 'post',
    response: ({ body }) => {
      let { data } = body.body
      let result = Ticket
      result.unshift({
        id: new Date().getTime().toString(),
        trips: data.region1,
        type: data.region,
        conductor: data.region2,
        num: data.nums,
        carriage: data.boxNum,
        max: data.limit,
        time: '2023/10/26',
        switch: true,
      })
      return {
        code: 200,
        message: '新增数据成功',
        data: result,
      }
    },
  },
  {
    url: '/api/ticket/updata',
    method: 'put',
    response: ({ body }) => {
      let { data } = body.body
      let result = Ticket
      let item = result.find((item) => item.id === data.id)
      if (item) {
        ;(item.trips = data.region1),
          (item.type = data.region),
          (item.conductor = data.region2),
          (item.num = data.nums),
          (item.carriage = data.boxNum),
          (item.max = data.limit),
          (item.time = data.time),
          (item.switch = true)
      }
      return {
        code: 200,
        message: '数据修改成功',
        data: item,
      }
    },
  },
  {
    url: '/api/ticket/delect',
    method: 'delete',
    response: (request) => {
      console.log(request, 'response')
      let { id } = request.query
      let result = Ticket
      result.forEach((item, index) => {
        if (item.id == id) {
          result.splice(index, 1)
        }
      })
      return {
        code: 200,
        data: result,
        message: '删除成功',
      }
    },
  },
]
