const Router = require('@koa/router')
const router = new Router()
const query = require('../db/query')

// 获取表单数据
router.post('/api/ticket/ticketItem', async (ctx) => {
  let { pageNo, pageSize, keyword } = ctx.request.body.body.obj
  let sql = `
        SELECT *
        FROM ticket
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
      data: result,
      total: total,
      message: '获取分页数据成功',
    }
  } else {
    ctx.body = {
      code: 400,
      message: '获取分页数据成功',
    }
  }
})

// 根据ID获取数据
router.post('/api/ticket/ticketJoint', async (ctx) => {
  let { id } = ctx.request.body.body
  const sql = `
      SELECT *
      FROM dalaohu
      WHERE uid = "${id}"
    `
  const result = await query(sql)
  if (result && result.length > 0) {
    ctx.body = {
      code: 200,
      data: result,
      message: 'success',
    }
  } else {
    ctx.body = {
      code: 400,
      message: 'error',
    }
  }
})

// 依据日期筛选
router.post('/api/ticket/ticketTime', async (ctx) => {
  let { data1, data2 } = ctx.request.body.body
  // 将日期字符串转换为时间戳，以便进行比较。
  let sql = `select * from ticket where 1=1`
  let res = await query(sql)
  let result = []
  // 需要确定用户将开始与结束日期都选定
  if (data1 > 0 && data2 > 0) {
    res.forEach((item, index) => {
      let times = Date.parse(item.time)
      if (times >= data1 && times <= data2) {
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

// 根据车次筛选
router.post('/api/ticket/ticketSelect', async (ctx) => {
  let { str } = ctx.request.body.body
  // LIKE 关键字来进行模糊匹配，${str}% 表示以 str 开头的字符串。
  let sql = `select * from ticket where type2 LIKE '${str}%'`
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

// 删除接口
router.delete('/api/ticket/ticketRemove', async (ctx) => {
  const { id } = ctx.query
  let sql = `DELETE FROM ticket WHERE id=${id}`
  let result = await query(sql)
  if (result && result.affectedRows) {
    ctx.body = {
      code: 200,
      message: '删除成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '删除成功',
    }
  }
})
// 新增接口
router.post('/api/ticket/ticketAddList', async (ctx) => {
  let {
    region,
    region1,
    time,
    go,
    esc,
    startTime,
    endTime,
    nums,
    boxNum,
    limit,
    seat,
    allStop,
  } = ctx.request.body.body.arr
  console.log(
    region,
    region1,
    time,
    go,
    esc,
    startTime,
    endTime,
    nums,
    boxNum,
    limit,
    seat,
    allStop,
    'region, region1, time, go, esc, startTime, endTime, nums, boxNum, limit, seat, allStop',
  )
  // Date对象来获取当前时间，并将其转换为ISO 8601格式的字符串。
  // 接下来，通过使用slice(0, 19)方法截取字符串的前19个字符，去除了毫秒部分。
  // 然后，使用replace('T', ' ')方法将日期和时间之间的"T"替换为空格，以获得更常见的日期时间格式。
  time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  let time3 = '21:59'
  let arrive = '当日到达'
  let data = '已提交'
  let num1 = '-'
  let sql = `INSERT INTO ticket (time,type1,type2,address1,address2,time1,time2,time3,arrive,date,num,num1,num2,num3,num4,num5,num6) VALUES ("${time}","${region1}","${region}","${go}","${esc}","${startTime}","${endTime}","${time3}","${arrive}","${data}","${num1}","${nums}","${boxNum}","${limit}","${seat}","${allStop}","${num1}")`
  await query(sql)
  let idQuery = `SELECT LAST_INSERT_ID() AS id;`
  // 查询语句来获取最后插入的ID
  let result = await query(idQuery)
  let ids = result[0].id
  if (ids)
    sql = `INSERT INTO dalaohu (uid,stop,arrive7,go, remain, stop1, stop2, stop3, stop4, stop5, arrive1, arrive2, arrive3, arrive4, arrive6, go1, go2, go3, go4, go5, remain1, remain2, remain3, remain4, remain5) VALUES ("${ids}", '以撒', '${startTime}', '-', '-', '拉撒路', '该隐', '莉莉丝', '亚波伦', '犹大', '${endTime}', '${startTime}', '08:26', '07:05', '07:05', '08:26', '08:26', '08:26', '08:26', '08:26', '-', '${boxNum}分钟', '${limit}分钟', '${seat}分钟', '-');`
  result = await query(sql)
  if (result && result.affectedRows > 0) {
    ctx.body = {
      code: 200,
      message: '新增成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '新增失败',
    }
  }
})
// 编辑接口
router.put('/api/ticket/ticketUpdateList', async (ctx) => {
  let {
    id,
    region,
    region1,
    time,
    go,
    esc,
    startTime,
    endTime,
    nums,
    boxNum,
    limit,
    seat,
    allStop,
  } = ctx.request.body.body.arr
  time = new Date().toISOString().slice(0, 19).replace('T', ' ')
  let time3 = '21:59'
  let arrive = '当日到达'
  let data = '已提交'
  let num1 = '-'
  console.log(id, 'id')
  const sql = `UPDATE ticket SET time="${time}",type1="${region1}",type2="${region}",address1="${go}",address2="${esc}",time1="${startTime}",time2="${endTime}",time3="${time3}",arrive="${arrive}",date="${data}",num="${num1}",num1="${nums}",num2="${boxNum}",num3="${limit}",num4="${seat}",num5="${allStop}",num6="${num1}"  WHERE id = ${id};`
  const result = await query(sql)
  if (result && result.affectedRows > 0) {
    ctx.body = {
      code: 200,
      message: '修改成功',
      data: result,
    }
  } else {
    ctx.body = {
      code: 400,
      message: '修改失败',
    }
  }
})
module.exports = router
