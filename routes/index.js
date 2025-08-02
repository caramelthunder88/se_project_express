const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const { NOT_FOUND } = require("../utils/errors");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
