import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

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

// PostSchema.plugin(mongoosePaginate);

const Post = mongoose.model("Post", PostSchema);

// const options = {
//   page: 1,
//   limit: 10,
//   collation: {
//     locale: "en",
//   },
// };

// Post.paginate({}, options, function (err, result) {
//   result.docs;
//   result.totalDocs = 100;
//   result.limit = 10;
//   result.page = 1;
//   result.totalPages = 10;
//   result.hasNextPage = true;
//   result.nextPage = 2;
//   result.hasPrevPage = false;
//   result.prevPage = null;
//   result.pagingCounter = 1;
// });

export default Post;
