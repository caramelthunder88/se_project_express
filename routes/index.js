const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");

router.use("/items", clothingItemRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
