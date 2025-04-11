// models/product.model.ts
import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  unit: String,
  stockQuantity: Number,
  sellerId: String,
  location: String,
  imageUrl: String,
  isAvailable: Boolean,
  brand: String,
  rating: Number,
  discount: Number,
  tags: [String],
  dateAdded: Date,
  status: String
}, {
  timestamps: true,
});

export const Product = models.Product || mongoose.model("Product", ProductSchema);
