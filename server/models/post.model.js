import mongoose, { Schema } from "mongoose";

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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// allow the Id to be referenced in the User model
PostSchema.virtual("user", {
  ref: "User",
  localField: "_id",
  foreignField: "posts",
  justOne: true,
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
