// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);


//4第一個被呼叫先執行，然後是syncF()執行1.3後來是5  2被丟到Q要等其他執行完才能執行