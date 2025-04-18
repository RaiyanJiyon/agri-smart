// models/Reply.ts
import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: { type: String, required: true, trim: true },
    author: {
      name: String,
      avatar: String,
      isExpert: { type: Boolean, default: false },
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
