const { Item } = require("../models");

class ItemRepository {
  async createItem(itemData) {
    const item = new Item(itemData);
    return await item.save();
  }

  // Get all items
  async getAllItems() {
    return await Item.find().populate("user"); // Populate user details if needed
  }

  // Get item by ID
  async getItemById(itemId) {
    return await Item.findById(itemId).populate("user");
  }

  // Update item status
  async updateItemStatus(itemId, status) {
    return await Item.findByIdAndUpdate(itemId, { status }, { new: true });
  }

  // Delete item
  async deleteItem(itemId) {
    return await Item.findByIdAndDelete(itemId);
  }

  // Get items by category (optional)
  async getItemsByCategory(category) {
    return await Item.find({ category }).populate("user");
  }

  async searchItems(keyword) {
    console.log("coming to the repo layer", keyword);
    const searchKeyword = new RegExp(keyword, "i");
    return await Item.find({
      $or: [
        { name: { $regex: searchKeyword } },
        { description: { $regex: searchKeyword } },
      ],
    });
  }
}

module.exports = ItemRepository;
