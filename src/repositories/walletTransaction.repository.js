const { WalletTransaction } = require("../models");

class WalletTransactionRepository {
  async createTransaction(data) {
    return await WalletTransaction.create(data);
  }

  async findTransactionsByUserId(userId) {
    return await WalletTransaction.find({ user: userId }).populate("campaign");
  }

  async findTransactionById(transactionId) {
    return await WalletTransaction.findById(transactionId).populate("campaign");
  }

  async updateTransactionById(transactionId, updates) {
    return await WalletTransaction.findByIdAndUpdate(transactionId, updates, {
      new: true,
    });
  }

  async deleteTransactionById(transactionId) {
    return await WalletTransaction.findByIdAndDelete(transactionId);
  }
}

module.exports = WalletTransactionRepository;
