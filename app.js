const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const auth = require("./middlewares/auth");
const mainRouter = require("./routes");
const { login, createUser } = require("./controllers/users");

const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
