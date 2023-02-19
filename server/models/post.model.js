import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    // name: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },

    prompt: {
      type: String,
      required: [true, "Prompt is required"],
    },
    photo: {
      type: String,
      required: [true, "Photo is needed"],
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

PostSchema.pre("find", function (next) {
  this.populate("userRef");
  next();
});

PostSchema.pre("findById", function (next) {
  this.populate("userRef");
  next();
});

PostSchema.pre("findByIdAndUpdate", function (next) {
  this.populate("userRef");
  next();
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
