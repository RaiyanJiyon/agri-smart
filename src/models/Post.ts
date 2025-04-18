// models/Post.ts
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    tags: [{ type: String, trim: true }],
    author: {
      name: String,
      avatar: String,
      isExpert: { type: Boolean, default: false },
    },
    likes: { type: Number, default: 0 },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    status: {
      type: String,
      enum: ["unanswered", "solved"],
      default: "unanswered",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
