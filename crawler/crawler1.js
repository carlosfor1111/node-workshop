// https://www.twse.com.tw/zh/page/trading/exchange/STOCK_DAY.html


const axios = require("axios")
const moment = require("moment");

axios
  .get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: "2330",
      },
    }
  )

  .then((response) => {
    console.log(response.data);
  });