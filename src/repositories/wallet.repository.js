const { Wallet } = require("../models/");

class WalletRepository {
  async createWallet(data) {
    return await Wallet.create(data);
  }

  async findByUserId(userId) {
    return await Wallet.findOne({ user: userId });
  }

  async updateWalletByUserId(userId, updates) {
    return await Wallet.findOneAndUpdate({ user: userId }, updates, {
      new: true,
    });
  }

  async deleteWalletByUserId(userId) {
    return await Wallet.findOneAndDelete({ user: userId });
  }
}

module.exports = WalletRepository;
