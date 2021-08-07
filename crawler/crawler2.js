const axios = require("axios");
const moment = require("moment");
const fs = require("fs");


new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
      reject(err);
    } else {
      resolve(stockCode);
    }
  });
})

.then((stockCode) => {
  return axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    })
    .then((response) => {
      console.log(response.data.title);
    });
});
