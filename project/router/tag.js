const express = require("express");

const router = express.Router();

// 用户登录
router.post("/users/login", async (req, res, next) => {
  try {
    res.send("post / hello world");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
