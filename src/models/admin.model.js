const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    role: { type: String, default: "admin" },
    passwordHash: { type: String, required: true },
    status: { type: String, enum: ["active", "banned"], default: "active" },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
