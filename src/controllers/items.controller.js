const { ItemRepository } = require("../repositories");
const { ItemService } = require("../services");

const itemService = new ItemService(new ItemRepository());

async function getAllItems(req, res) {
  try {
    const allItems = await itemService.getAllItems(); // Correct method name
    return res.status(200).json({
      success: true,
      data: allItems,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve items",
    });
  }
}

async function createItem(req, res) {
  try {
    const itemData = {
      name: req.body.name,
      user: req.body.user,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      category: req.body.category ? req.body.category : "others",
    };

    const newItem = await itemService.createItem(itemData);
    return res.status(200).json({
      success: true,
      message: "new product is successfully created",
      data: newItem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "there is some issue",
    });
  }
}

async function getItemById(req, res) {
  try {
    const id = req.params.id;
    const item = await itemService.getItemById(id);
    return res.status(200).json({
      success: true,
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch the data",
    });
  }
}

async function getItemsByCategory(req, res) {
  try {
    const category = req.params.category;
    const items = await itemService.getItemsByCategory(category);
    return res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "fail to find the category",
    });
  }
}

async function updateItem(req, res) {
  try {
    const id = req.params.id;
    const status = req.params.status;

    const updatedinfo = await itemService.updateItemStatus(id, status);

    return res.status(200).json({
      success: true,
      message: `successfully updated the status to ${updatedinfo.status}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `update failed ${error.message}`,
    });
  }
}

async function deleteItem(req, res) {
  try {
    const id = req.params.id;
    const item = await itemService.deleteItem(id);
    return res.status(200).json({
      success: true,
      message: `successfully deleted the ${item.name}`,
      data: [item.name, item.id],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "there is some issue while deleting please try again later",
    });
  }
}

async function searchItems(req, res) {
  try {
    const keyword = req.query.keyword;
    console.log(keyword);
    const results = await itemService.searchItems(keyword);
    return res.status(200).json({
      success: true,
      message: "search completed succesfully",
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  getItemsByCategory,
  deleteItem,
  searchItems,
};
