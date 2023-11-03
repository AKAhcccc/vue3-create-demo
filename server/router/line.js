// Koa的路由中间件，用于处理 HTTP 请求的路由和请求转发
const Router = require('@koa/router')
const router = new Router()
const query = require('../db/query')

// 获取line，分页，搜索数据
router.post('/api/lint/getlist', async (ctx) => {
  let { pageNo, pageSize } = ctx.request.body.body.obj
  // 获取数据库数据
  let sql = `select * from lint where 1=1`
  let result = await query(sql)
  let total = result.length
  // 实现页面分页
  if (pageNo && pageSize)
    sql += ` limit ${(pageNo - 1) * pageSize}, ${pageSize}`
  result = await query(sql)
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
      total: total,
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '获取失败',
    }
  }
})

// 搜索数据
router.post('/api/line/search', async (ctx) => {
  let { key } = ctx.request.body.body
  // 执行模糊搜索
  let sql = `select * from lint where 1=1 and id like "${key}"`
  let result = await query(sql)
  let total = result.length
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      data: result,
      msg: '获取成功',
      total: total,
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '获取失败',
    }
  }
})

// 根据车次筛选
router.post('/api/line/select', async (ctx) => {
  let { obj } = ctx.request.body.body
  console.log(obj, 'obj')
  // LIKE 关键字来进行模糊匹配，${str}% 表示以 str 开头的字符串。
  let sql = `select * from lint where type2 LIKE '${obj}%'`
  let result = await query(sql)
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      data: result,
      message: '筛选成功',
    }
  } else {
    ctx.body = {
      code: 400,
      message: '筛选失败',
    }
  }
})

// 依据日期筛选
router.post('/api/line/time', async (ctx) => {
  let { time1, time2 } = ctx.request.body.body
  // 将日期字符串转换为时间戳，以便进行比较。
  let sql = `select * from lint where 1=1`
  let res = await query(sql)
  let result = []
  // 需要确定用户将开始与结束日期都选定
  if (time1 > 0 && time2 > 0) {
    console.log(1)
    res.forEach((item, index) => {
      let times = Date.parse(item.time)
      if (times >= time1 && times <= time2) {
        result.push(item)
      }
    })
  }
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      msg: '道爷成啦',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      msg: '数据获取失败',
    }
  }
})

// 删除接口
router.delete('/api/line/delete', async (ctx) => {
  const { id } = ctx.query
  const sql = `delete from lint where id=${id}`
  const result = await query(sql)
  if (result && result.affectedRows) {
    ctx.body = {
      code: 200,
      message: '删除成功',
    }
  } else {
    ctx.body = {
      code: 400,
      message: '删除成功',
    }
  }
})

// 新增接口
router.post('/api/line/addlist', async (ctx) => {
  let { stop, line, text } = ctx.request.body.body.obj
  let state = false
  const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  console.log(time, 'time')
  let address1 = '北京朝阳'
  let address2 = '昆明北'
  const sql = `INSERT INTO lint (type1,type2,Line,time,state,address1,address2) VALUES ("${stop}","${line}","${text}","${time}","${state}","${address1}","${address2}")`
  const result = await query(sql)
  console.log(result, 'result')
  if (result && result.affectedRows) {
    ctx.body = {
      code: 200,
      message: '新增成功',
    }
  } else {
    ctx.body = {
      code: 400,
      message: '新增失败',
    }
  }
})

// 修改接口
router.put('/api/line/updata', async (ctx) => {
  const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  let { id, type1, type2, input2, checked, address1, address2 } =
    ctx.request.body.body.obj
  console.log(id, type1, type2, input2, checked, address1, address2)
  let sql = `update lint set type1="${type1}",type2="${type2}",Line="${input2}",time="${time}",state="${checked}",address1="${address1}",address2="${address2}" where id=${id}`
  let result = await query(sql)
  console.log(result, 'result')
  if (result && result.affectedRows) {
    ctx.body = {
      code: 200,
      message: '修改成功',
    }
  } else {
    ctx.body = {
      code: 400,
      message: '修改失败',
    }
  }
})
module.exports = router
