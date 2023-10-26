// createUserList:此函数执行会返回一个数组，数组里面包含两个用户信息
import Mock from 'mockjs'
function createUserList() {
  return Mock.mock({
    "list|100": [
      {
        "id": "@id",
        "trips": /^[GCDZTSPKXLY1-9]\d{1,4}$/,
        "type|1": ["高铁", "火车"],
        "conductor|+1": ['张三', "李四", "王五"],
        "num|310-629": 1,
        "carriage|8-12": 8,
        "max": '646',
        "time": '@DATETIME("yyyy/MM/dd")',
        "switch|+1": [true, false]
      }
    ]
  }).list
}
export default [
  {
    url: '/api/ticket/getList',
    method: 'get',
    response:(request) => {
      let res = createUserList()
      return {
        code: 200,
        message: "获取成功",
        data: {
          data: res,
        }
      }
    }
  },
  {
    url: '/api/ticket/trainManagement',
    method: 'get',
    response: (request) => {
      let { arr1, arr2 } = request.query;
      console.log(arr1,arr2);
      const res = createUserList()
      let page = arr1
      let limit = arr2
      let total = res.length
      let TicketList = res.slice(
        (page - 1) * limit, page * limit
      )
      if (res.length > 0) {
        return {
          code: 200,
          message: "获取成功",
          data: {
            data: TicketList,
            total: total,
            limit: limit,
          }
        }
      } else {
        return {
          code: 400,
          message: "获取失败",
        }
      }
    }
  },
  {
    url: '/api/ticket/select',
    method: 'post',
    response: ({body}) => {
      let res = createUserList()
      const { data } = body.body;
      let TicketList  = res.filter(item => item.type === data);
      return {
        code: 200,
        data: TicketList,
        message: 'Success',
      }
    }
  },
  
  // 根据时间区间筛选
  {
    url: '/api/ticket/time',
    method: 'get',
    response: (request) => {
      let { time1, time2 } = request.query
      const date1 = new Date(time1);
      const formattedDate1 = date1.toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const date2 = new Date(time2);
      const formattedDate2 = date2.toLocaleDateString('zh', { year: 'numeric', month: '2-digit', day: '2-digit' });
      const timestamp1 = Date.parse(formattedDate1);
      const timestamp2 = Date.parse(formattedDate2);
      console.log(timestamp1, timestamp2, "123");
    }
  },
  
]