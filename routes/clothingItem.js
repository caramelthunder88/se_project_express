const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

const {
  validateCardBody,
  validateItemId,
} = require("../middlewares/validation");

router.get("/", getItems);

// Create
router.post("/", validateCardBody, createItem);

// Delete
router.delete("/:itemId", validateItemId, deleteItem);

// Like an item
router.put("/:itemId/likes", validateItemId, likeItem);

// Unlike an item
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
