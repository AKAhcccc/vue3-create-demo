// Koa的路由中间件，用于处理 HTTP 请求的路由和请求转发
const Router = require('@koa/router')
const router = new Router()
const query = require('../db/query')

// 获取车站信息/并执行分页
router.post('/api/ticket/stop', async (ctx) => {
    let { pageNo, pageSize, keyword } = ctx.request.body.body.obj;
    console.log(pageNo, pageSize, "123");
    ctx.body = {
        code: 200,
    }
    // 获取表单数据
    let sql = `select * from goods where 1=1`;
    let result = await query(sql);
    // 执行模糊搜索
    if (keyword) sql += ` and city like "%${keyword}%"`
    result = await query(sql);
    let total = result.length;
    // 执行语句分页
    if (pageNo && pageSize) sql += ` limit ${(pageNo - 1) * pageSize}, ${pageSize}`
    result = await query(sql);
    if (result && result.length > 0) {
        ctx.body = {
            code: 200,
            msg: '获取成功',
            data: {
                goods: result,
                total: total
            }
        }
    } else {
        ctx.body = {
            code: 400,
            msg: '获取失败',
        }
    }
})

// 根据首字母筛选
router.post('/api/ticket/select', async ctx => {
    let { str } = ctx.request.body.body;
    // LIKE 关键字来进行模糊匹配，${str}% 表示以 str 开头的字符串。
    let sql = `select * from goods where city LIKE '${str}%'`;
    let result = await query(sql);
    console.log(result, "result");
    if (result && result.length > 0) {
        ctx.body = {
            code: 200,
            data: result,
            message: "筛选成功"
        }
    } else {
        ctx.body = {
            code: 400,
            message: "筛选失败"
        }
    }
})

// 车站新增数据
router.post('/api/ticket/addStop', async ctx => {
    let { addData } = ctx.request.body.body.str;
    let start = true
    const sql = `INSERT INTO goods (city,state) VALUES ("${addData}",${start})`;
    let result = await query(sql);
    if (result && result.affectedRows) {
        ctx.body = {
            code: 200,
            message: "数据新增成功"
        }
    } else {
        ctx.body = {
            code: 400,
            message: "数据新增失败"
        }
    }
})

// 车站编辑数据
router.put('/api/ticket/editStip', async ctx => {
    const { arr, obj } = ctx.request.body.body;
    let id = arr.id;
    let sql = `update goods set city="${obj}" where id=${id}`
    let result = await query(sql);
    if (result && result.affectedRows) {
        ctx.body = {
            code: 200,
            message: "修改数据成功"
        }
    } else {
        ctx.body = {
            code: 400,
            message: "修改数据失败"
        }
    }
})

// 删除接口
router.delete('/api/ticket/delete', async ctx => {
    const { id } = ctx.query;
    const sql = `delete from goods where id=${id}`;
    const result = await query(sql);
    if (result && result.affectedRows) {
        ctx.body = {
            code: 200,
            message: "删除成功"
        }
    } else {
        ctx.body = {
            code: 400,
            message: "删除成功"
        }
    }
})

module.exports = router
