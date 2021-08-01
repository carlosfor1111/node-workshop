

let doWork = function(job , timer , cb){
    setTimeout(()=>{
        let dt = new Date();
        cb(null, `完成工作: ${job} at ${dt.toISOString()}` );
    },timer);
};

//callback hell

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

doWork("刷牙" ,3000, function(err, data){
    if(err){
        console.err('發生錯誤了:',err);
        return;
    }
    console.log(data);

    doWork("吃早餐", 3000, function (err, data) {
      if (err) {
        console.err("發生錯誤了:", err);
        return;
      }
      console.log(data);

        doWork("睡覺", 5000, function (err, data) {
          if (err) {
            console.err("發生錯誤了:", err);
            return;
          }
          console.log(data);
        });
    });
});


