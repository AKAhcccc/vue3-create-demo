// Koa的路由中间件，用于处理 HTTP 请求的路由和请求转发
const Router = require('@koa/router')
const router = new Router()
const query = require('../db/query')

// 获取数据、分页、搜索
router.post('/api/ticket/orderList', async (ctx) => {
  let { pageNo, pageSize, keyword } = ctx.request.body.body.obj
  let sql = `
        SELECT *
        FROM orders
        WHERE 1=1
    `
  let result = await query(sql)
  let total = result.length
  // 执行模糊搜索
  if (keyword) sql += ` AND type1 LIKE "%${keyword}%"`
  result = await query(sql)
  // 执行语句分页
  if (pageNo && pageSize)
    sql += ` LIMIT ${(pageNo - 1) * pageSize}, ${pageSize}`
  result = await query(sql)
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      message: '搜索成功',
      data: result,
      total: total,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '搜索失败',
    }
  }
})

// 执行筛选
router.post('/api/ticket/orderSelect2', async (ctx) => {
  let { str } = ctx.request.body.body
  const sql = `SELECT * FROM orders WHERE state LIKE "${str}"`
  const result = await query(sql)
  console.log(result, 'result')
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      message: '筛选成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '筛选失败',
    }
  }
})

// 执行筛选2
router.post('/api/ticket/orderSelect1', async (ctx) => {
  let { str } = ctx.request.body.body
  const sql = `SELECT * FROM orders WHERE grade LIKE "${str}"`
  const result = await query(sql)
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      message: '筛选成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '筛选失败',
    }
  }
})

// 依据日期筛选
router.post('/api/ticket/orderSearchTimeList', async (ctx) => {
  let { date1, date2 } = ctx.request.body.body
  const sql = `SELECT * FROM orders WhERE 1=1`
  let res = await query(sql)
  let result = []
  if (date1 > 0 && date2 > 0) {
    res.forEach((item, index) => {
      let times = Date.parse(item.time)
      if (times >= date1 && times <= date2) {
        result.push(item)
      }
    })
  }
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      message: '日期筛选成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 200,
      message: '日期筛选失败',
    }
  }
})

module.exports = router
