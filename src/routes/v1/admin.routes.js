const express = require("express");
const adminRouter = express.Router();
const { adminController } = require("../../controllers");
const { verifyJwt } = require("../../utils/jwt.utils");

adminRouter.post("/auth", verifyJwt, adminController.adminAuthentication);
adminRouter.get("/", verifyJwt, adminController.getAdminProfile);
adminRouter.post("/", adminController.createAdminUser);
adminRouter.patch(
  "/ngo/approval/:id",
  verifyJwt,
  adminController.ngoRequestApproval
);
adminRouter.patch("/ban/:id", adminController.banUser);

module.exports = adminRouter;
