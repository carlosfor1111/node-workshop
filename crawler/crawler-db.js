const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  port: 3306,
  password: "",
  database: "stock",
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上",err);
  }
});

connection.end();

// async function doWork() {
//   let stockCode = await new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", (err, stockCode) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(stockCode.trim());
//       }
//     });
//   });

//   //   let response = await axios.get(
//   //     "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
//   //     {
//   //       params: {
//   //         response: "json",
//   //         date: moment().format("YYYYMMDD"),
//   //         stockNo: stockCode,
//   //       },
//   //     }
//   //   );

//   //   console.log(response.data.title);
// }

// doWork();
