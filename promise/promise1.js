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

let job1 = doWork("刷牙", 3000, true);
// dowork回傳的是promise的物件
job1.then(
  (result) => {
    console.log("第一個函式被呼叫了", result);
  },
  (error) => {
    console.log("第二個函式被呼叫了", error);
  }
);

let job2 = doWork("吃早餐", 5000, true);
// dowork回傳的是promise的物件
job2.then(
  (result) => {
    console.log("第一個函式被呼叫了", result);
  },
  (error) => {
    console.log("第二個函式被呼叫了", error);
  }
);

let job3 = doWork("睡覺", 5000, true);
// dowork回傳的是promise的物件
job3.then(
  (result) => {
    console.log("第一個函式被呼叫了", result);
  },
  (error) => {
    console.log("第二個函式被呼叫了", error);
  }
);