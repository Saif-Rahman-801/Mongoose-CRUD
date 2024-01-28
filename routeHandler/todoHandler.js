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
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get a todo by id
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  // http://localhost:5000/todo?status=active
  try {
    const { status } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    // Add more conditions as needed

    const todos = await Todo.find(query);

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// update todo
router.put("/:id", async (req, res) => {
  // method 1
 /* try{
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  } 
 */

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
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

/* 
// routes/todo.js
const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Create a new todo
router.post("/", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const result = await todo.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const { status, otherQueryParam } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    // Add more conditions as needed

    const todos = await Todo.find(query);

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

 */
