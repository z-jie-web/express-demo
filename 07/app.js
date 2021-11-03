const express = require("express");
const fs = require("fs");
const path = require("path");
const template = require("art-template");

const app = express();

const list = [
  { id: "1", name: "11111" },
  { id: "2", name: "22222" },
  { id: "3", name: "33333" },
  { id: "4", name: "44444" },
  { id: "5", name: "55555" },
];


// view engine setup
app.engine("art", require("express-art-template"));
app.set("view options", {
  debug: process.env.NODE_ENV !== "production",
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");

app.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "./views/index.html"),
    // 默认读出的文件格式为二进制格式  需转换成utf-8形式
    "utf-8",
    (err, data) => {
      if (err) {
        return res.status(404).send("404 Not Found");
      }

      // 获取数据
      // 获取页面模板
      // 数据 + 模板 = 完整页面

      // let str = "";
      // list.forEach((data) => {
      //   str += `<li>${data.name}</li>`;
      // });

      // const ret = data.replace("`--`", `<ul>${str}</ul>`);

      const ret = template.render(data, {
        foo: "bar",
        list,
      });

      res.end(ret);
    }
  );
  // res.send('Hello, world')
});

app.get("/art", (req, res) => {

  res.render('index.art',{
    foo: "bar",
    list,
  });
});

app.listen("3001", () => {
  console.log("listening on");
});
