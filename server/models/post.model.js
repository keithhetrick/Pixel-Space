import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    photo: {
      type: String,
      required: [true, "Photo is needed"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
