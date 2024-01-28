const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
// app.use(cors())
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.86h0qhu.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.86h0qhu.mongodb.net/collectingTodo?retryWrites=true&w=majority`;

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

// Application crud
app.use("/todo", todoHandler);

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);

    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}
run().catch(console.dir);

// MongoDB connection
/* mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB:', err)); */

app.get("/", (req, res) => {
  res.send("HEllO WORLD");
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
