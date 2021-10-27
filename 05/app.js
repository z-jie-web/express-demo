const express = require("express");

const app = express();

// 不做任何限定的中间件
app.use((req, res, next) => {
  console.log(11);

  next();
});

// 限定请求路径   才走此中间件
app.use("/login", (req, res, next) => {
  console.log(3333);

  next();
});

// 限定请求方法 + 请求路径   才走此中间件
app.get("/", (req, res) => {
  res.send("Hello, world");
});

// 多个中间件处理函数调用， 必须调用next函数到下一步
// 同一个匹配路径及方法可以写多个， 可使用 next('router') 直接跳出本次处理栈
// 数组也可执行

const a = (req, res, next) => {
  // 可使用 next('router') 直接跳出本次处理栈, 直接到b函数
  if(!req.params.id) next('router')
  console.log('aaa')
  next();
};

const b = (req, res, next) => {
  console.log('bbbb')
  next();
};

const arr = [a, b];

app.get(
  "/user",
  arr,
  (req, res, next) => {
    res.send("user, world");
    next();
  },
  (req, res, next) => {
    console.log(2222222);
    next();
  },
  (req, res) => {
    console.log(33333);
  }
);

app.listen("3000", () => {
  console.log("listening on");
});
