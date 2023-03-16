import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      trim: true,
    },
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
