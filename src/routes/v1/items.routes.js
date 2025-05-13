const express = require("express");
const { itemsController } = require("../../controllers");

const itemsRouter = express.Router();

itemsRouter.get("/category/:category", itemsController.getItemsByCategory);
itemsRouter.get("/search", itemsController.searchItems);
itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/:id", itemsController.getItemById);

itemsRouter.post("/", itemsController.createItem);

itemsRouter.delete("/:id", itemsController.deleteItem);

itemsRouter.patch("/:id/:status", itemsController.updateItem);

module.exports = itemsRouter;
