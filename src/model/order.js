import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    products: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref:'Product',
      required:true
      }
    ],
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", productSchema);

module.exports = Order;
