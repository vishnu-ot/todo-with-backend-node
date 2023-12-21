const express = require("express");
const cors = require("cors");
const app = express();
let todoItem = require("./todoItems.json");
app.use(cors());
app.use(express.json());

console.log(todoItem, "todo item.....");
app.get("/api/todo", (req, res) => {
  res.json(todoItem);
});

app.post("/api/todo", (req, res) => {
  const { newTodoItem, id } = req.body;
  if ("newTodoItem" in req.body) {
    let newItem = { id: Date.now(), todoItem: newTodoItem, isCompleted: false };
    todoItem.push(newItem);

    return res.json(todoItem);
  }
  if ("id" in req.body) {
    todoItem = todoItem.map((item) => {
      console.log(item.id);
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });

    return res.json(todoItem);
  }
  res.status(404).json("inavalid parameters");
});

app.delete("/api/todo", (req, res) => {
  const { itemId } = req.body;
  let itemIndex = todoItem.findIndex((item) => item.id === itemId);
  console.log(itemIndex);
  if (itemIndex !== -1) {
    todoItem.splice(itemIndex, 1);
    return res.json(todoItem);
  }
  res.status(404).json("invalid id");
});

app.put("/api/todo", (req, res) => {
  const { id, newData } = req.body;
  let found = false;
  todoItem.forEach((item) => {
    if (item.id === id) {
      item.todoItem = newData;
      item.isCompleted ? false : false;
      found = true;
    }
  });
  if (found) {
    return res.json(todoItem);
  } else {
    return res.status(404).json("not found");
  }
});

app.listen(3000, () => console.log("Server running"));
