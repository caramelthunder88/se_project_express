// const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err.name, err.message);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" });
      }
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server." });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err.name, err.message);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Error from getItems", error: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      return Promise.reject(err);
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name, err.message);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid item data" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  console.log(itemId);
  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name, err.message);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name, err.message);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};
const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error("Item not found");
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err.name, err.message);

      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid item ID format" });
      }
      return res
        .status(err.statusCode || INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
