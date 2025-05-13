class ItemService {
  constructor(repository) {
    this.itemRepository = repository;
  }

  async createItem(itemData) {
    if (!itemData.name || !itemData.description || !itemData.imageUrl) {
      throw new Error("All fields are required");
    }

    const newItem = await this.itemRepository.createItem(itemData);
    return newItem;
  }

  // Get all items
  async getAllItems() {
    return await this.itemRepository.getAllItems();
  }

  // Get item by ID
  async getItemById(itemId) {
    const item = await this.itemRepository.getItemById(itemId);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }

  // Update item status (for example, when an item is donated)
  async updateItemStatus(itemId, status) {
    if (!["available", "reserved", "donated"].includes(status)) {
      throw new Error("Invalid status");
    }
    return await this.itemRepository.updateItemStatus(itemId, status);
  }

  // Delete item
  async deleteItem(itemId) {
    return await this.itemRepository.deleteItem(itemId);
  }

  // Get items by category
  async getItemsByCategory(category) {
    return await this.itemRepository.getItemsByCategory(category);
  }

  async searchItems(keyword) {
    console.log("here is service layer with ", keyword);
    if (!keyword) {
      throw new Error("search terms cannot be empty");
    }
    return await this.itemRepository.searchItems(keyword);
  }
}

module.exports = ItemService;
