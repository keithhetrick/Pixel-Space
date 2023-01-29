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
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Add foreign Id from User as userId in the form of a one-to-one relationship to the PostSchema model
PostSchema.virtual("user", {
  ref: "User",
  localField: "_id",
  foreignField: "posts",
  justOne: true,
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
