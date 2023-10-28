// Koa的路由中间件，用于处理 HTTP 请求的路由和请求转发
const Router = require('@koa/router');
const router = new Router()
const query = require('../db/query')


// 获取车站信息
router.post('/api/ticket/stop', async ctx => {
    const { obj } = ctx.request.body.body;
    console.log(obj.pageNo,"obj");
    ctx.body = {
        code:200
    }
    // const { page = 1, count = 10 } = ctx.query;
    // // 获取表单数据
    // const sql = `select * from goods where 1=1`;
    // const total = result.length;
    // if (page && count) sql += ` limit ${(page - 1) * count}, ${count}`
    // const result = await query(sql);
    // if (result && result.length > 0) {
    //     ctx.body = {
    //         code: 200,
    //         msg: '获取成功',
    //         data: {
    //             goods: result
    //         }
    //     }
    // }else {
    //     ctx.body = {
    //         code: 400,
    //         msg: '获取失败',
    //     }
    // }
})

module.exports = router