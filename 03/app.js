const express = require("express");
const { getDb, saveDb } = require("./db");

const app = express();

// 配置解析表单请求体： application/json
app.use(express.json());

// 配置解析表单请求体： application/x-www-form-urlencoded
app.use(express.urlencoded());

app.get("/todos", async (req, res) => {
  try {
    const data = await getDb();
    res.status(200).json(data.todos);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
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
    res.status(500).json({
      error: err.message,
    });
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
    res.status(500).json({
      error: err.message,
    });
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
    res.status(500).json({
      error: err.message,
    });
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
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen("3000", () => {
  console.log("listening on");
});
