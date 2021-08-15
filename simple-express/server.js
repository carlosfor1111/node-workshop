const express = require('express')

// 利用express 建立一個express application

const app = express()

// HTTP Method :get,post,put,patch ,delete
app.get('/', function (request, response, next) {
  response.send('Hello')
})

app.get('/', function (request, response, next) {
  response.send('about')
})

app.listen(3000, function () {
  console.log('我們的webserver啟動了')
})
