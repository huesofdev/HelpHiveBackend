const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "User" },
    imageUrl: [{ type: String, required: true }],
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["clothing", "furniture", "electronics", "others"],
    },
    status: {
      type: String,
      enum: ["available", "reserved", "donated"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);
module.exports = Item;
