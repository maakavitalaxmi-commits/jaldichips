const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: false,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: "Spicy Namkeen",
    },
    showOnPage: {
      type: String,
      enum: ["home", "b2b"],
      default: "home",
    },
    weight: {
      type: String,
      trim: true,
      default: "100 g",
    },
    brand: {
      type: String,
      trim: true,
      default: "jaldichips",
    },
    shelfLife: {
      type: String,
      trim: true,
      default: "4 Months",
    },
    ingredients: {
      type: String,
      trim: true,
      default: "G9 Banana + Rice Oil + flavour - salty",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, createdAt: -1 });

module.exports = mongoose.model("Product", productSchema);
