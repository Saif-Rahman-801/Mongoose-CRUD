const express = require("express");
const router = express.Router();
const Todo = require("../schemas/todoSchema");

// const Todo = new mongoose.model("Todo", todoSchema);

// post a todo
router.post("/", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    // const todo = await Todo.create({title, description, status});
    // res.status(201).json(todo);
    const todo = new Todo({ title, description, status });
    const result = await todo.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

});

// post multiple todo
router.post("/all", async (req, res) => {
  try {
    const multipleDataArray = req.body;
    const result = await Todo.insertMany(multipleDataArray);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// get todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// update todo
router.put("/:id", async (req, res) => {
  try{
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
