//await //async
// 基於promise 語法糖
async function doAllWorks() {
  let doWork = function (job, timer, isOK) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let dt = new Date();
        if (isOK) {
          resolve(`完成工作: ${job} at ${dt.toISOString()}`);
        } else {
          reject(`失敗了${job}`);
        }
      }, timer);
    });
  };

  let result1 = await doWork("刷牙", 3000, true);
  console.log(result1);

  let result2 = await doWork("吃早餐", 5000, true);
  console.log(result2);

  let result3 = await doWork("睡覺", 3000, true);
  console.log(result3);
}
doAllWorks();

