const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
const { resolve } = require("path");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上", err);
  }
});

async function doWork() {
  let stockCode = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        resolve(stockCode.trim());
      }
    });
  });

  connection.query(
    "SELECT * FROM stock WHERE stock_id = ?",
    [stockCode],
    function (error, results, fields) {
      if (error) throw error;

      console.log(results);
      if (results.length > 0) {
        console.log("有資料");
      }
    }
  );

  connection.end();

  let response = await axios.get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    }
  );

  console.log(response.data.title);
}

doWork();
