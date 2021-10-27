const express = require("express");
const { getDb, saveDb } = require("./db");
const router = require("./router");

const app = express();

// 配置解析表单请求体： application/json
app.use(express.json());

// 配置解析表单请求体： application/x-www-form-urlencoded
app.use(express.urlencoded());

// // 挂载路由
// app.use(router);

// 挂载路由，并添加前缀
app.use("/a", router);

app.get("/todos", async (req, res, next) => {
  try {
    const data = await getDb();
    res.status(200).json(data.todos);
  } catch (err) {
    next(err);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const data = await getDb();
    const todo = data.todos.find((item) => item.id === Number(req.params.id));
    if (!todo) {
      return res.status(404).end();
    }
    res.status(200).send(todo);
  } catch (err) {
    next(err);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const todo = req.body;

    if (!todo.title) {
      return res.status(422).json({
        error: "The field title is required",
      });
    }

    const data = await getDb();

    if (data.todos.find((item) => item.title === todo.title)) {
      return res.status(200).json({
        warning: "title 已存在",
      });
    }

    const lastTodo = data.todos[data.todos.length - 1];
    data.todos.push({
      id: lastTodo ? lastTodo.id + 1 : 1,
      title: todo.title,
    });

    await saveDb(data);

    res.status(200).send({ success: "保存成功" });
  } catch (err) {
    next(err);
  }
});

app.patch("/todos/:id", async (req, res) => {
  try {
    const data = await getDb();
    const todo = data.todos.find((item) => item.id === Number(req.params.id));
    if (!todo) {
      return res.status(404).end();
    }
    Object.assign(todo, req.body);

    await saveDb(data);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const data = await getDb();
    const index = data.todos.findIndex(
      (item) => item.id === Number(req.params.id)
    );
    if (index === -1) {
      return res.status(404).end();
    }
    data.todos.splice(index, 1);

    await saveDb(data);
    res.status(200).json(data);
  } catch (err) {
    // 1、不传承进入下一个
    // 2、传参'router' 跳出此中间件直行到下一个中间件
    // 1、传参err 对象 跳过所有剩余无错误处理路由和中间件函数  执行错误处理中间件
    next(err);
  }
});

// 在所有的路由之后配置404内容
app.use((req, res, next) => {
  // console.log(err);
  res.status(404).json({
    code: 404,
    title: "未找到路由",
  });
});

// 在所有的中间件之后挂载错误处理中间件 （一定是四个参数）
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    err,
  });
});

app.listen("3000", () => {
  console.log("listening on");
});
