const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes')

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello, task tracker! I am your server");
// });

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log("MongoDB connection Successfull!"))
  .catch((error) => {
    console.log("There was an error in the connection: ");
    console.error(error);
  });

app.listen(5000, () => {
  console.log("Server started running...");
});
