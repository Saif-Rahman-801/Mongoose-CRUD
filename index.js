const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler")

// Middleware
app.use(
  cors({
    origin: [
    //   "https://marvelous-medovik-366b22.netlify.app",
      "http://localhost:5173",
    ],
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.86h0qhu.mongodb.net/?retryWrites=true&w=majority`;


// MongoDB connection
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB:', err));


// Application crud
app.use("/todo", todoHandler)

app.get("/", (req, res) => {
  res.send("HEllO WORLD");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});