const express = require('express')

// 利用express 建立一個express application

const app = express()

// app.use使用一個中間件
// app.use(handler)
app.use((req, res, next) => {
  let current = new Date();
  console.log(`有人訪問 at ${current.toISOString()}`)
  next()
})
app.use((req, res, next) => {
  console.log('我是第二個中間件')
  next()
})
// HTTP Method :get,post,put,patch ,delete
// router 路由
app.get('/', function (request, response, next) {
  response.send('Hello')
})

app.get('/about', function (request, response, next) {
  response.send('about')
})

app.listen(3000, function () {
  console.log('我們的webserver啟動了')
})
