import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../models/post.model.js";

dotenv.config();

// ENVIRONMENT VARIABLES
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// CLOUDINARY CONFIGURATION
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { name, prompt, photo, user } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
      user,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};

//
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
};

// Get a post by id
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching post failed, please try again",
    });
  }
};

// Update a post's name
export const updatePostName = async (req, res) => {
  try {
    const { name } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Updating post failed, please try again",
    });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Deleting post failed, please try again",
    });
  }
};

// Update a post's relational User
export const updatePostUser = async (req, res) => {
  try {
    const { user } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { user },
      { new: true }
    );

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Updating post failed, please try again",
    });
  }
};

// Get a post's relational User
export const getPostUser = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("user");

    res.status(200).json({ success: true, data: post.user });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching user failed, please try again",
    });
  }
};
