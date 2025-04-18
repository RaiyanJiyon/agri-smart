import mongoose from "mongoose";

const ContributorSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  posts: { type: Number, default: 0 },
});

export default mongoose.models.Contributor ||
  mongoose.model("Contributor", ContributorSchema);
