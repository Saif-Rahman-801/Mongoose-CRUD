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
  // method 1
 /*  try{
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  } */

  // method 2
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Todo.updateOne({ _id: id }, { $set: updateData });

    if (result.nModified === 0) {
      // If no document was modified, it means the document was not found
      return res.status(404).json({ message: "Todo not found" });
    }

    // Fetch the updated document
    const updatedTodo = await Todo.findById(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;

/* 
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Todo.updateOne({ _id: id }, { $set: updateData });

    if (result.nModified === 0) {
      // If no document was modified, it means the document was not found
      return res.status(404).json({ message: "Todo not found" });
    }

    // Fetch the updated document
    const updatedTodo = await Todo.findById(id);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 */
