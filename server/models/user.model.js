import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [255, "Name must be at most 255 characters long"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minLength: [3, "Email must be at least 3 characters long"],
      maxLength: [255, "Email must be at most 255 characters long"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (this.password !== this.confirmPassword) {
    next(new Error("Passwords do not match"));
  }
});

// Add foreign Id from Post as posts in the form of a one-to-many relationship to the UserSchema model
UserSchema.virtual("post", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

const User = mongoose.model("User", UserSchema);

export default User;
