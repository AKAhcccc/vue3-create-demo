const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost', // 连接的数据库服务器
  port: '3306', // 端口号
  user: 'root', // 用户名
  password: 'root', // 密码
  database: 'ticket', // 数据库名
})

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}

module.exports = query
