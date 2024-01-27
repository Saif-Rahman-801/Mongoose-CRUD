const express = require("express");
const router = express.Router();

// get todos
router.get("/", async (req, res) => {});

// get a todo by id
router.get("/:id", async (req, res) => {});

// post a todo
router.post("/", async (req, res) => {});

// post all todo
router.post("/all", async (req, res) => {});

// update todo
router.put("/:id", async (req, res) => {});

// delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
