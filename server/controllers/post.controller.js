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

// CONTROLLERS
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

// export const getPostById = async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);

//     res.status(200).json({ success: true, data: post });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Fetching post failed, please try again",
//     });
//   }
// };

export const postImage = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};
