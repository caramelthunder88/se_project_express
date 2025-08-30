const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

const { validateProfileUpdateBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateProfileUpdateBody, updateCurrentUser);

module.exports = router;
