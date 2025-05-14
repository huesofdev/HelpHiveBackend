const express = require("express");
const { campaignsContoller } = require("../../controllers");

const campaignsRouter = express.Router();

campaignsRouter.get("/", campaignsContoller.getAllCampaigns);
campaignsRouter.patch("/add/donation/:id", campaignsContoller.addRaisedAmount);
campaignsRouter.patch("/status/:id", campaignsContoller.updateCampaignStatus);
campaignsRouter.get("/:id", campaignsContoller.getCampaignById);
campaignsRouter.patch("/:id", campaignsContoller.updateCampaign);
campaignsRouter.delete("/:id", campaignsContoller.deleteCampaign);

campaignsRouter.post("/", campaignsContoller.createCampaign);

module.exports = campaignsRouter;
