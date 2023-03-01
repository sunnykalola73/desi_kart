import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true,
  }
);

categorySchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'categoryID'
})


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
