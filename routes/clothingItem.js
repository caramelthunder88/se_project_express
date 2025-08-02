const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// Create
router.post("/", createItem);

// Delete
router.delete("/:itemId", deleteItem);

// Like an item
router.put("/:itemId/likes", likeItem);

// Unlike an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
