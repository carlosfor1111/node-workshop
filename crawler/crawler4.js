const axios = require('axios')
const moment = require('moment')
const fs = require('fs')
const mysql = require('mysql')
require('dotenv').config()

// 需求:
// 1.讀stock.txt 把股票代碼讀進來
// 2.去資料庫的stock表格查看看，這個代碼不在我們的服務範圍內
// 3.如果是去證交所抓資料
// 4.抓回來的資料存到資料庫的stock_price表格裡

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

connection.connect((err) => {
  if (err) {
    console.error('資料庫連不上', err)
  }
})

function readStock () {
  return new Promise((resolve, reject) => {
    fs.readFile('stock.txt', 'utf8', (err, stockCode) => {
      if (err) {
        reject(err)
      } else {
        resolve(stockCode.trim())
      }
    })
  })
}
function queryStockPrice (stockCode) {
  return axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params: {
      response: 'json',
      date: moment().format('YYYYMMDD'),
      stockNo: stockCode
    }
  })
}

function queryStockCode (stockCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM stock WHERE stock_id = ?',
      [stockCode],
      function (error, results, fields) {
        if (error) {
          reject(error)
        }
        resolve(results)
      }
    )
  })
}

function insertData (parsedData) {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?',
      [parsedData],
      function (error, results, fields) {
        if (error) {
          reject(error)
        }
        resolve(results)
      }
    )
  })
}

async function doWork () {
  try {
    // 1.讀stock.txt 把股票代碼讀進來
    const stockCode = await readStock()
    // 2.去資料庫的stock表格查看看，這個代碼不在我們的服務範圍內
    const queryResults = await queryStockCode(stockCode)

    if (queryResults.length === 0) {
      throw '此股票代碼不在服務範圍內'
    }
    console.info('資料庫有查到資料')
    // 3.如果是去證交所抓資料
    const response = await queryStockPrice(stockCode)
    const stockData = response.data
    if (stockData.stat !== 'OK') {
      throw '從證交所查到的資料有問題'
    }
    // 4.抓回來的資料存到資料庫的stock_price表格裡
    const parsedData = stockData.data.map((item) => {
      item = item.map((value) => {
        return value.replace(/,/g, '')
      })
      item[0] = parseInt(item[0].replace(/\//g, ''), 10) + 19110000
      item.unshift(stockCode)
      return item
    })
    console.log(parsedData)

    const insertResult = await insertData(parsedData)
    console.log(insertResult)
  } catch (e) {
    console.error(e)
  } finally {
    connection.end()
  }
}

doWork()
