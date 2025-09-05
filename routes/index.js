const router = require("express").Router();
const clothingItemRouter = require("./clothingItem");
const userRouter = require("./users");
const { NotFoundError } = require("../middlewares/errors");

router.use("/items", clothingItemRouter);

router.use("/users", userRouter);

router.use("*", (req, res, next) => next(new NotFoundError("Route not found")));
module.exports = router;
