import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create a new user
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

    // automatically fill roles array with default of the Number 0
    if (!roles) {
      user.roles = [0];
    }

    const roleTitle = user.roles.map((role) => {
      if (role === 0) {
        return "user";
      } else if (role === 1) {
        return "admin";
      }
    });

    res.status(200).json({
      success: true,
      data: user,
      message: `New '${roleTitle}' created - ${name}`,
    });
  } catch (err) {
    console.log("ERROR:", err);

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

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password").populate("posts");

    if (!users?.length) {
      return res.status(404).json({ message: "No users found" });
    }

    // sort user by name
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

    // sort user by newest first
    users.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    // sort role by highest number first & return only the highest role
    // users.forEach((user) => {
    //   user.roles.sort((a, b) => {
    //     return b - a;
    //   });

    //   user.roles = user.roles[0];
    // });

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
    const { name, email, password, confirmPassword, roles, posts } = req.body;

    // all fields dont have to be provided while updating
    const user = await User.findByIdAndUpdate(
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

    if (candidate && candidate._id.toString() !== req.params.id) {
      return res.status(409).json({
        success: false,
        message: `Unable to update user - "${email}" already exists`,
      });
    }

    // check if password and confirmPassword match
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
      user.roles = req.body.roles || user.roles;
      user.posts = req.body.posts || user.posts;
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
        posts: updatedUser.posts,
      },
    });
  } catch (err) {
    console.log("ERROR:", err);

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

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

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
