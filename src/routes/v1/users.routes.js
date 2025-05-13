const express = require("express");
const { usersController } = require("../../controllers");
const { verifyJwt } = require("../../utils/jwt.utils");

const userRouter = express.Router();

userRouter.patch("/:id", usersController.updateUserDetails);
userRouter.get("/:id", usersController.getUserProfile);
userRouter.post("/", usersController.createNewUser);

userRouter.post("/auth", verifyJwt, usersController.LoginAuthentication);

module.exports = userRouter;
