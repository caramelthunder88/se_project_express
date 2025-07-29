const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
