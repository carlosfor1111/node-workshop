async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);

//4第一個被呼叫先執行,然後是呼叫async()裡面的1，然後是呼叫5(2.3因為async await 會一起等待到其他執行完才執行)