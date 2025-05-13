const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["donor", "ngo"], required: true },
    idProofUrl: {
      type: String,
      required: function () {
        return this.role === "ngo";
      },
    },
    ngoApprovalStatus: {
      type: String,
      enum: ["approved", "rejected", "pending"],
      default: function () {
        return this.role === "ngo" ? "pending" : undefined;
      },
      validate: {
        validator: function () {
          return this.role === "ngo";
        },
        message: "Approval Status is only applicable for Ngos",
      },
    },
    status: { type: String, enum: ["active", "banned"], default: "active" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
