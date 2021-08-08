
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");


// 1.做出基本promise版型
new Promise((resolve, reject) => {
  //非同步工作
  fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
      // 4.找到失敗的地方
      reject(err);
    } else {
      //有成功讀檔
      // 3.找到原本處理成功的地方
      resolve(stockCode);
    }
  });
})
  .then((stockCode) => {
    // 5.用then的第一個參數接住reslove
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    });
  })
  .then((response) => {
    console.log(response.data.title);
  })
  .catch((err) => {});
