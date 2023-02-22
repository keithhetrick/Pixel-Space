import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      ],
    },
    confirmPassword: {
      type: String,
      required: [true, "Confirm password is required"],
    },

    roles: [
      {
        type: Number,
        default: 0,
      },
    ],

    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// UserSchema.pre("find", async function (next) {
//   this.populate("posts");
//   next();
// });

// UserSchema.pre("findById", async function (next) {
//   this.populate("posts");
//   next();
// });

// UserSchema.pre("findByIdAndUpdate", async function (next) {
//   this.populate("posts");
//   next();
// });

const User = mongoose.model("User", UserSchema);

export default User;
