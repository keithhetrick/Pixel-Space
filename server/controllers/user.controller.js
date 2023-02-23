import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

// CREATE - Create a new user
export const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, roles } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
      roles: [0],
    });

    if (!user || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (roles) {
      user.roles = roles;
    } else {
      user.roles = [0];
    }

    const roleTitle = user.roles.map((role) => {
      if (role === 0) {
        return "user";
      } else if (role === 1) {
        return "admin";
      }
    });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    res.status(200).json({
      success: true,
      data: user,
      message: `New '${roleTitle}' created - ${name}`,
    });
  } catch (err) {
    console.error("\nERROR:", err);

    // Check for duplicate
    if (err.code === 11000) {
      res.status(409).json({
        success: false,
        message: `Unable to create user - "${err.keyValue.name}" already exists`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Unable to create user -
      ${err.message.replace("User validation failed: ", "")}`,
      });
    }
  }
});

// READ - Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password").populate("posts");

    if (!users?.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // sort user by newest first
    users.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching users failed - ${err.message}`,
    });
  }
});

// READ - get a user by id
export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching user failed - ${err.message}`,
    });
  }
});

// UPDATE - Update a user by id
export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, roles, posts } = req.body;

    const user = await User.findById(req.params.id).exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check for duplicate email exists
    const candidate = await User.findOne({ email })
      .collation({
        locale: "en",
        strength: 2,
      })
      .exec();

    if (candidate && candidate?._id.toString() !== req.params.id) {
      return res.status(409).json({
        success: false,
        message: `Unable to update user - "${email}" already exists`,
      });
    }

    user.name = name;
    user.email = email;

    if (posts) {
      user.posts = posts;
    } else if (!posts?.length) {
      user.posts = [];
    }

    if (roles) {
      user.roles = roles;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.confirmPassword = hashedPassword;
    }

    const userObject = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        confirmPassword,
        roles,
        posts,
      },
      { new: true }
    );

    const updatedUser = await userObject.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword,
        posts: updatedUser.posts,
      },
      message: `User "${updatedUser.name}" updated`,
    });
  } catch (err) {
    console.error("\nERROR:", err);

    // check for duplicate
    if (err.code === 11000 && err.keyValue.email === req.body.email) {
      res.status(409).json({
        success: false,
        message: `Unable to update user - "${err.keyValue.email}" already exists`,
      });
    } else if (err.code === 11000 && err.keyValue.name === req.body.name) {
      res.status(409).json({
        success: false,
        message: `Unable to update user - "${err.keyValue.name}" already exists`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Updating user failed - ${err.message}`,
      });
    }
  }
});

// DELETE - Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    const post = await Post.findOne({ user: req.params.id }).lean().exec();

    if (post) {
      return res.status(400).json({
        success: false,
        message: `User has posts and cannot be deleted`,
      });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    // if user has posts, throw error saying user has posts
    if (err.message.includes("posts")) {
      return res.status(500).json({
        success: false,
        message: `User has posts and cannot be deleted`,
      });
    }

    res.status(500).json({
      success: false,
      message: `Deleting user failed - ${err.message}`,
    });
  }
});

// READ - Get a user's posts
export const getUserPosts = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    res.status(200).json({ success: true, data: user.posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Fetching user posts failed - ${err.message}`,
    });
  }
});

// CREATE - when Post is created, add post's ObjectId to the user's posts
export const postToUserPosts = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const post = await Post.findOne(
      { _id: req.params.postId },
      (err, foundUser) => {
        console.log("\nFOUND USER:", foundUser);
      }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    user.posts = [...user.posts, post._id];

    await user.save();

    res.status(200).json({
      success: true,
      data: user.posts,
      message: `Post added to ${user.name}'s posts`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Adding post to user posts failed - ${err.message}`,
    });
  }
});

// DELETE - Delete a post from a user's posts
export const deleteUserPost = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postIndex = user.posts.findIndex(
      (post) => post._id.toString() === req.params.postId
    );

    user.posts.splice(postIndex, 1);

    await user.save();

    res.status(200).json({
      success: true,
      data: user.posts,
      message: `Post deleted from ${user.name}'s posts`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Deleting user post failed - ${err.message}`,
    });
  }
});
