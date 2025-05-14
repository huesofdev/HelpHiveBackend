const { Campaign } = require("../models");

class CampaignRepository {
  createCampaign(data) {
    console.log("coming into the repository");
    const campaign = new Campaign(data);
    return campaign.save();
  }

  // Find all campaigns (with optional filters)
  getAllCampaigns(filter = {}) {
    return Campaign.find(filter).populate("ngo", "name email").exec();
  }

  // Find a single campaign by ID
  getCampaignById(id) {
    return Campaign.findById(id).populate("ngo", "name email").exec();
  }

  // Update a campaign by ID
  updateCampaign(id, updates) {
    const { title, description, imageUrls } = updates;
    return Campaign.findByIdAndUpdate(
      id,
      {
        $set: { title: title, description: description, imageUrls: imageUrls },
      },
      { new: true }
    );
  }

  updateCampaignStatus(id, status) {
    return Campaign.findByIdAndUpdate(
      id,
      { $set: { status: status } },
      { new: true }
    );
  }

  // Delete a campaign by ID
  deleteCampaign(id) {
    return Campaign.findByIdAndDelete(id);
  }

  // Find campaigns by status
  getCampaignsByStatus(status) {
    return Campaign.find({ status }).populate("ngo").exec();
  }

  // Increment the raisedAmount of a campaign
  incrementRaisedAmount(id, amount) {
    return Campaign.findByIdAndUpdate(
      id,
      { $inc: { raisedAmount: amount } },
      { new: true }
    );
  }
}

module.exports = CampaignRepository;
