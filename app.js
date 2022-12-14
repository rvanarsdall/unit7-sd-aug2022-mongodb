require("dotenv").config();
console.log(process.env);
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
// ! Step 1 is make a connection to the database
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASEURL);
const db = mongoose.connection;

const userController = require("./controllers/user.controller");
const movieController = require("./controllers/movie.controller");

db.once("open", () => console.log("Connected to the DB"));

app.use(express.json());
app.use("/user", userController);
app.use("/movie", movieController);
app.listen(process.env.PORT, function () {
  console.log(`app is listening on port ${process.env.PORT}`);
});
