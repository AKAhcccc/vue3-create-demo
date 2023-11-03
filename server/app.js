// 引入koa
const Koa = require('koa')
// 将解析后的数据挂载到 Koa 的上下文对象 ctx.request.body
const { koaBody } = require('koa-body')
// 解析post请求中间件
const bodyParser = require('koa-bodyparser')
// 解决跨域问题
const cors = require('@koa/cors')
// 错误处理中间件
const error = require('koa-json-error')
// 日志中间件
const logger = require('koa-logger')
// new出app实例
const app = new Koa()

app.use(logger())
app.use(error())
app.use(koaBody({ multipart: true }))
app.use(bodyParser())
app.use(cors())
app.use(require('./router/stop').routes())
app.use(require('./router/line').routes())
app.use(require('./router/ticket').routes())
app.listen(8888, (err) => {
  console.log('Server is running on port 8888')
})
