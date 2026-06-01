const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    platform: {
      type: String,
      required: true,
      enum: ["whatsapp", "facebook", "twitter", "copy-link", "other"],
      default: "other",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Share", shareSchema);
