const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
require("dotenv").config();
const {
  validateSigninBody,
  validateSignupBody,
} = require("./middlewares/validation");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const auth = require("./middlewares/auth");
const mainRouter = require("./routes");
const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItem");

const errorHandler = require("./middlewares/error-handler");

const { logger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

app.use(cors());
app.use(express.json());

app.use(requestLogger);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    logger.info("Connected to DB");
  })
  .catch((err) => logger.error("MongoDB connection error", { err }));

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.post("/signin", validateSigninBody, login);
app.post("/signup", validateSignupBody, createUser);
app.get("/items", getItems);

app.use(auth);

app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(`Listening on Port ${PORT}`);
});
