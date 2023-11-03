// Node.js框架
const Koa = require('koa')
// 创建HTTP服务器
const http = require('http')
// WebSocket通信
const { Server } = require('socket.io')
// 处理日期和时间
const moment = require('moment')
const app = new Koa()
// 聊天记录
const chatList = []
// Koa应用程序作为回调函数传递给createServer方法
const server = http.createServer(app.callback())
// 创建Socket.io实例，并将HTTP服务器与Socket.io关联起来
const io = new Server(server, {
  serveClient: false, //表示不提供客户端文件
  // cors用于配置跨域资源共享，允许所有来源的请求，并支持GET和POST方法。
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

// 监听客户端发送的消息事件
io.on('connection', (socket) => {
  // 发送聊天记录给新连接的客户端
  socket.emit('fresh-message', chatList)
  // 监听客户端发送的消息事件
  socket.on('send-message', (user, message) => {
    const createTime = moment().format('YYYY-MM-DD HH:mm:ss')
    // 将收到的消息添加到聊天记录中
    chatList.push({
      user: user.UserInfo,
      message: user.Info,
      userInfo: user.UserInfo.name,
      createTime,
    })
    // 将更新后的聊天记录发送给所有客户端
    socket.emit('fresh-message', chatList)
  })
})
// 监听端口号
io.listen(8001)
