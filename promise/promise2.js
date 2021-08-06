let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    //模擬一個非同步工作
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

Promise.then; //然後做什麼(兩個參數:第一個成功、第二個失敗~!!!也會回傳pormise)

Promise.catch; //負責捕捉失敗

let job1 = doWork("刷牙", 3000, true);
// dowork回傳的是promise的物件
job1
  .then((result) => {
    console.log("第1個then", result);
    return doWork("吃早餐", 5000, true);
  })
  .then((result) => {
    console.log("第2個then", result);
    return doWork("寫功課", 3000, true);
  })
  .then((result) => {
    console.log("第3個then", result);
    return doWork("睡覺", 3000, true);
  })
  .catch((error) => {
    console.log("第二個函式被呼叫了", error);
  });
