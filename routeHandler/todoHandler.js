const express = require("express");
const router = express.Router();
const { default: mongoose } = require("mongoose");
const Todo = require("../schemas/todoSchema");

// const Todo = new mongoose.model("Todo", todoSchema);

// post a todo
router.post("/", async (req, res) => {
  const {title, description, status} = req.body;
  try {
    const todo = await Todo.create({title, description, status});
    res.status(200).json(todo)
  } catch (err) {
    res.status(400).json({error: err.message})

  }

  /* const newTodo = new Todo(req.body); //validate your data with your schema

  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "Server side schema validation error",
      });
    } else {
      res.status(500).json({
        message: "Data insertion successful",
      });
    }
  }); */
});

// post multiple todo
router.post("/all", async (req, res) => {});

// get todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// update todo
router.put("/:id", async (req, res) => {});

// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
