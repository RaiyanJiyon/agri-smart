import mongoose from "mongoose";

const ResourcesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    authorRole: { type: String, required: true, trim: true },
    datePublished: { type: Date, required: true },
    readTime: { type: String, required: true, trim: true },
    featured: { type: Boolean, required: true },
    tags: { type: [String], required: true },
    url: { type: String, required: true, trim: true },
    previewContent: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Resource || mongoose.model("Resource", ResourcesSchema);
