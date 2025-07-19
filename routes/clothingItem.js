const router = require("express").Router();

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

// Create
router.post("/", createItem);

// Read

router.get("/", getItems);

// Update

router.put("/:itemId", updateItem);

// Delete

router.delete("/:itemId", deleteItem);

// Like an item
router.put("/:itemId/likes", likeItem);

// Unlike an item
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
