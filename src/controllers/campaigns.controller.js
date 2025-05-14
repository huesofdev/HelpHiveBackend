const { CampaignService } = require("../services");
const { CampaignRepository } = require("../repositories");

const campaignService = new CampaignService(new CampaignRepository());

async function createCampaign(req, res) {
  try {
    const campaignData = req.body;
    const result = await campaignService.createCampaign(campaignData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCampaignById(req, res) {
  try {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCampaigns(req, res) {
  try {
    const filters = req.query;
    const options = {
      skip: parseInt(req.query.skip) || 0,
      limit: parseInt(req.query.limit) || 10,
      sort: { createdAt: -1 },
    };
    const campaigns = await campaignService.getAllCampaigns(filters, options);
    res.json({
      success: true,
      data: campaigns,
      message: "successfully fetched the campaigns",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCampaign(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCampaign = await campaignService.updateCampaign(
      id,
      updateData
    );
    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCampaignStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const campaign = await campaignService.updateCampaignStatus(id, status);
    return res.status(201).json({
      success: true,
      data: campaign,
      message: "you have successfully updated the status",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "sorry we cant able to updated the status",
      data: [],
      error: error.message,
    });
  }
}

async function deleteCampaign(req, res) {
  try {
    const { id } = req.params;
    const deletedCampaign = await campaignService.deleteCampaign(id);
    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addRaisedAmount(req, res) {
  try {
    const { id } = req.params;
    const { amount } = req.body;
    const updatedCampaign = await campaignService.addRaisedAmount(id, amount);
    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCampaignsByNgo(req, res) {
  try {
    const { ngoId } = req.params;
    const campaigns = await campaignService.getCampaignsByNgo(ngoId);
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getCampaignById,
  addRaisedAmount,
  getAllCampaigns,
  updateCampaign,
  createCampaign,
  deleteCampaign,
  getCampaignsByNgo,
  updateCampaignStatus,
};
