const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");

router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

module.exports = router;
