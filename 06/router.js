const express = require("express");

// 1、创建路由实例
// 路由实例其实就相当于一个  mini 的 Express实例
const router = express.Router();

// 2、配置路由
router.get("/api", (req, res) => {
  res.send("get///");
});

router.get("/a", (req, res) => {
  res.send("getaaaaa///");
});

router.post("/", (req, res) => {
  res.send("post///");
});

// 3、导出路由实例
module.exports = router;


//  4、将路由集成到Express实例应用中