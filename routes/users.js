const router = require("express").Router();
const { getUsers, createUser, getUser } = require("../controllers/users");

router.get("/", getUsers);

router.get("/:userId", getUser);
// router.get("/:userId", (req, res) => {
// res.send(`User ID requested: ${req.params.userId}`);
// });

router.post("/", createUser);
// router.post("/", (req, res) => {
// res.send("New user creation endpoint (POST /users)");
// });

module.exports = router;
