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
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Add User as one-to-one relationship to the PostSchema model
// PostSchema.virtual("user", {
//   ref: "User",
//   localField: "userId",
//   foreignField: "_id",
// });

// PostSchema.set("toObject", { virtuals: true });
// PostSchema.set("toJSON", { virtuals: true });

const Post = mongoose.model("Post", PostSchema);

export default Post;
