const express = require("express");

const app = express();


// 中间件函数   req,  res, next  必须执行next函数   进行下一步
app.use((req, res, next) => {
  console.log(req.method, req.url, Date.now());
  console.log(2222);
  // 交出执行权， 往后继续匹配执行  
  next();
});

app.get("/", (req, res) => {
  // console.log(req.method, req.url, Date.now());
  res.send("get, /");
});

app.get("/about", (req, res) => {
  res.send("get, /about");
});

app.post("/login", (req, res) => {
  res.send("post, /login");
});

app.listen("3000", () => {
  console.log("listening on");
});
