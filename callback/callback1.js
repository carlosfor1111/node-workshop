// let doWork = function(job , timer , cb){
//     setTimeout(()=>{
//         let dt = new Date();
//         cb(null, `完成工作: ${job} at ${dt.toISOString()}` );
//     },timer);
// };

// //callback hell

// let dt = new Date();
// console.log(`開始工作 at ${dt.toISOString()}`);

// doWork("刷牙" ,3000, function(err, data){
//     if(err){
//         console.err('發生錯誤了:',err);
//         return;
//     }
//     console.log(data);

//     doWork("吃早餐", 3000, function (err, data) {
//       if (err) {
//         console.err("發生錯誤了:", err);
//         return;
//       }
//       console.log(data);

//         doWork("睡覺", 5000, function (err, data) {
//           if (err) {
//             console.err("發生錯誤了:", err);
//             return;
//           }
//           console.log(data);
//         });
//     });
// });

// /* 使用foreach寫法 */

// /* 顯示開始工作時間 */
// console.log(`開始工作 at ${new Date().toISOString()}`);

// /* 將待辦事項及時間寫在 object 中並用 array 做排序 */
// let doWorks = [
//   {
//     job: "刷牙",
//     timer: 3000,
//   },
//   {
//     job: "吃早餐",
//     timer: 5000,
//   },
//   {
//     job: "寫功課",
//     timer: 3000,
//   },
// ];
// let time = 0;
// /* 使用forEach迴圈將 array 中的 object 逐個取出 */
// doWorks.forEach(function (doWork, index) {
//   /* 使用累加法加延遲時間在每次迴圈中累加已達到非同步效果 */
//   time = time + doWork.timer;
//   /* 使用setTimeout來做延遲 */
//   setTimeout(function () {
//     let dt = new Date();
//     /* 顯示完成的工作事項 */
//     console.log(`完成工作: ${doWork.job} at ${dt.toISOString()}`);
//   }, time);
// });

// let doWorks = function (err, data) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(function () {
//       resolve([err, data]);
//     }, data);
//   });
// };

// doWorks("開始工作", 0)
//   .then(function (message) {
//     console.log(message[0], message[1]); // 顯示 開始工作 0
//     return doWorks("刷牙", 3000); // 延遲三秒之後，告訴後面的函示顯示 刷牙 3000
//   })
//   .then(function (message) {
//     console.log(message[0], message[1]); // 顯示  3000
//     return doWorks("吃早餐", 3000); // 延遲三秒之後，告訴後面的函示顯示吃早餐 3000
//   })
//   .then(function (message) {
//     console.log(message[0], message[1]); // 顯示  3000
//     return doWorks("睡覺", 3000); // 延遲三秒之後，告訴後面的函示顯示吃睡覺 3000
//   })
//   .then(function (message) {
//     console.log(message[0], message[1]); // 顯示 c 2000
//   });
