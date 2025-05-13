const express = require("express");
const campaignsRouter = require("./campaigns.routes");
const walletRouter = require("./wallet.routes");
const itemsRouter = require("./items.routes");
const userRouter = require("./users.routes");
const adminRouter = require("./admin.routes");

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/campaigns", campaignsRouter);
v1Router.use("/items", itemsRouter);
v1Router.use("/wallet", walletRouter);
v1Router.use("/admin", adminRouter);

module.exports = { v1Router };
