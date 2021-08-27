const cors = require('cors')
const express = require('express')
const connection = require('./utils/db')

// 利用express 建立一個express application

const app = express()

app.use(cors())

// app.use使用一個中間件nom
app.use((req, res, next) => {
  const current = new Date()
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
app.get('/stock', async (req, res, next) => {
  const result = await connection.queryAsync('SELECT * FROM stock')
  res.json(result)
})

app.get('/stock/:stockCode', async (req, res, next) => {
  const result = await connection.queryAsync(
    'SELECT * FROM stock_price WHERE stock_id=?',
    [req.params.stockCode]
  )
  res.json(result)
})

app.use((req, res, next) => {
  res.status(404).json({ message: 'NOT FOUND' })
})

app.listen(3000, async function () {
  // 因為改成pool,不用手動連線
  // await connection.connectAsync();
  console.log('我們的webserver啟動了')
})
