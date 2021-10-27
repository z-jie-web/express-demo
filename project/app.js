const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/errorHandler");
require('./model')

const app = express();

const PORT = process.env.PORT || 3000;

// 提供解析请求体
app.use(express.json());

// 提供解析请求体
app.use(express.urlencoded());

// 提供日志打印
app.use(morgan("dev"));

// 提供跨域请求
app.use(cors());

app.use("/api", router);

// 挂载统一处理服务端错误中间件
app.use(errorHandler());


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
