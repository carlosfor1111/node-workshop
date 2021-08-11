const axios = require('axios')
const moment = require('moment')
const fs = require('fs')

async function doWork () {
  const stockCode = await new Promise((resolve, reject) => {
    fs.readFile('stock.txt', 'utf8', (err, stockCode) => {
      if (err) {
        reject(err)
      } else {
        resolve(stockCode.trim())
      }
    })
  })

  const response = await axios.get(
    'https://www.twse.com.tw/exchangeReport/STOCK_DAY',
    {
      params: {
        response: 'json',
        date: moment().format('YYYYMMDD'),
        stockNo: stockCode
      }
    }
  )

  console.log(response.data.title)
}

doWork()
