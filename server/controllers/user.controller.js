import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log("ERROR:", err);

    if (err.code === 11000) {
      res.status(500).json({
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

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).populate("posts");

    // sort by name
    // users.sort((a, b) => {
    //   const nameA = a.name.toUpperCase();
    //   const nameB = b.name.toUpperCase();

    //   if (nameA < nameB) {
    //     return -1;
    //   }
    //   if (nameA > nameB) {
    //     return 1;
    //   }
    //   return 0;
    // });

    // sort by newest first
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

// Get a user by id
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

export const updateUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, posts } = req.body;

    // all fields dont have to be provided while updating
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
        confirmPassword,
        // posts,
      },
      { new: true }
    );

    if (password !== confirmPassword) {
      res.status(500).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // ignore "posts" if not provided
    // if (!posts) {
    //   delete user.posts;
    // }

    // if (posts) {
    //   user.posts.push(req.body.posts);
    // } else if (posts === []) {
    //   user.posts = [];
    // } else {
    //   res.status(500).json({
    //     success: false,
    //     message: "Posts already exists",
    //   });
    // }

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.password = req.body.password || user.password;
      user.confirmPassword = req.body.confirmPassword || user.confirmPassword;
      // user.posts = req.body.posts || user.posts;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        confirmPassword: updatedUser.confirmPassword,
        // posts: updatedUser.posts,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Updating user failed - ${err.message}`,
    });
  }
});

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Deleting user failed - ${err.message}`,
    });
  }
});

// Get a user's relational posts
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
