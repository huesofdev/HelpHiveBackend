class CampaignService {
  constructor(campaignRepository) {
    this.campaignRepository = campaignRepository;
  }

  async createCampaign(campaignData) {
    return await this.campaignRepository.createCampaign(campaignData);
  }

  async getCampaignById(campaignId) {
    return await this.campaignRepository.getCampaignById(campaignId);
  }

  async getAllCampaigns(filters = {}, options = {}) {
    return await this.campaignRepository.getAllCampaigns(filters, options);
  }

  async updateCampaign(campaignId, updateData) {
    return await this.campaignRepository.updateCampaign(campaignId, updateData);
  }

  async updateCampaignStatus(campaignId, status) {
    if (status !== "completed" && status !== "cancelled") {
      throw new Error("please use a valid status");
    }
    return await this.campaignRepository.updateCampaignStatus(
      campaignId,
      status
    );
  }

  async deleteCampaign(campaignId) {
    return await this.campaignRepository.deleteCampaign(campaignId);
  }

  async addRaisedAmount(campaignId, amount) {
    if (amount <= 0) {
      throw new Error("please use a valid amount");
    }
    return await this.campaignRepository.incrementRaisedAmount(
      campaignId,
      amount
    );
  }

  async getCampaignsByNgo(ngoId) {
    return await this.campaignRepository.findByNgo(ngoId);
  }
}

module.exports = CampaignService;
