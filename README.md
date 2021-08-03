# NodeJS  7/31、8/1筆記

### 上課內容

---

#### 安裝方法

二選一，推薦先試試看 nvm

- 直接安裝 node
下載網址: https://nodejs.org/zh-tw/download/

- nvm: node version manager
    - production v14
    - 想要測試 v16
     
windows:

==安裝路徑不能出現中文==

https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows
![](https://i.imgur.com/Ix1Tqsk.png)


```bash=
$ nvm -verion
1.1.7

# 列出可以安裝的版本

$ nvm ls-remote 14
# windows版本
$ nvm list available

# 安裝最新版本號
$ nvm install 14.17.4

# 切換要使用的 node 版本
$ nvm use 14.17.4

# 確認目前執行的版本
$ node -v

# 列出你目前主機安裝的版本
二擇一
$ nvm ls
$ nvm list 

# 設定預設的版本
$nvm alias default 14.17.4
```

#### 時間複雜度
```
而下面這個演算法：
O(1), O(n), O(n^2),....
#時間複雜度:一個程式的時間複雜度是指完全地執行程式所需的計算機時間。

o(1) => 不管 n 輸入多少，這個程式永遠只會執行一次。
function(int n){
    for(i=0;i<n;i++){
        print(i);
    }
}
o(n) => 這個演算法則是依據輸入的 n 的數量會跑 n 次，所以是 O(n)。
function(int n){
    for(i=0;i<n;i++){
        for(j=0;j<n-1;j++){
            print(i*j);
        }
    }
}
```
#### 空間複雜度
```
#空間複雜度:空間複雜度是指完全地執行程式所需的記憶體量。

例如下面這個函式，不管程式跑了幾遍，都不會影響使用的變數數量=>O(1)
function(int n){
    for(int i=0;i<n;i++){
        print(i);
    }
}
下面這個函式，會隨著丟進去的數字而影響變數的量=>O(n) 。
function(int n){
    int c[n];
    for(int i=0;i<n;i++){
        c[i] = i;
    }
}
```
```
```
## NodeJS 是什麼

- NodeJS 是不是一個程式語言嗎？ No
- NodeJS 是不是一個框架？ No
- NodeJS 可以讓我們脫離瀏覽器、在伺服器端執行 JS 程式語言的一個環境

![](https://i.imgur.com/JcXqMC2.png)

JS

document 瀏覽器
window 瀏覽器
location 瀏覽器
setTimeout, setInterval 瀏覽器

NodeJS, 瀏覽器都有提供：
console.log
setTimeout, setInterval
date

### 已經有 PHP，為什麼還需要 nodejs?

Ryan Dahl 高性能的 web server

apache, C, Lua, Haskell 跟 Ruby...

WWW
Google Chrome 
Netscape Ｘ 
微軟獨占 windows 自動就裝好 IE
IE6 

Google Chrome V8 --> 效能很好的 JS 執行引擎

Firefox: SpiderMonkey
Safari: JavaScriptCore / Nitro --> new IE
Edge: Chakra，後來使用 Chromium/V8 進行了重構

Ryan JS (V8)

特色:（面試必考題）
- 單執行緒
- 非阻塞
- 非同步IO
- event loop

### 單執行緒

什麼是執行緒 thread ？
  
Process 成本比較高的執行單位，content swtich 的成本比較高
Thread: Process 之下，CPU 執行的單位 （可能會發生 race condition)

JS 是一個 single thread 的程式語言 -> 一個人在工作

PHP 相反 => multi-process

誰比較快？

上課測試結論：
- nodeJS=麥當勞(客人請旁邊稍等) / PHP=銀行(緊握電話)
- apache + php 會有很多個 process
- node 只有一個 process (只有一個 thread*)
- 小壓力：沒太多差別
    - apache + php 會一直開新的 process
    - node 永遠只有一個，但 CPU 一直飆高
- 大壓力:
    - apache + php => 開到太多就 crash => 有 58 個 request failed
    - node: 沒有任何 request failed，而且表現數據比小壓力還好

NodeJS vs PHP -> 依照我們上述測試，NodeJS 比較快

所謂的性能比較，不同情境下，可能會有截然不同的結果

php 開這麼多 process，為什麼還比較慢？ => content switch 的成本、記憶體的資源
node 單執行緒 => 先用完 CPU
  - 缺點：無法善用多核心
 
PHP 容錯能力比較強大
node single-thread 一但發生讓這個 thread 中止執行的錯誤時，可能整個 server 就掰掰了

### Event-loop

![](https://i.imgur.com/QtirgaE.png)

stack: Data Structure 的一種，Last In First Out (LIFO) 或 Fisrt In Last Out (FILO)

Last In First Out (LIFO): 後進先出
Fisrt In Last Out (FILO): 先進後出

頭         尾
[1, 2, 3, 4]

把東西放進 stack 的尾巴 ==> push
把東西從 stack 的尾巴拿出來 ==> pop

![](https://ithelp.ithome.com.tw/upload/images/20190914/20106426YeUbOz6oSF.jpg)
Queue -> 佇列 排隊

First In First Out (FIFO): 先進先出

拿出        放進去
shift <---> unshift

JS 的 array function 是已經幫你實作了 Stack / Queue


![](https://i.imgur.com/CDkxhLn.png)

![](https://i.imgur.com/yXHU74r.png)


![](https://i.imgur.com/10XuJdB.png)


## XMLHttpRequest

XML Http Request

瀏覽器提供的

json => JavaScript Object Notation 
=> 把 json 當成資料格式來用

json 為什麼會大幅取代 xml?
- json 本來就是一個 object, js 原生可以就可以處理，PHP 也都可以。
- json 比較小(不論資料，就論欄位名稱，XML 會是兩倍)

xml 是另外一種資料格式 (傳輸用的資料格式)


## 上課心得

上課了解到很多作業系統及資料庫相關的知識，讓我能更容易了解到程式執行背後的原因，課堂練習說明也非常詳細，受益良多。


