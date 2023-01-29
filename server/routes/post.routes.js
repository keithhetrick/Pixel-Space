import express from "express";
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostName,
  updatePostUser,
  getPostUser,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/api/post", getAllPosts);
router.post("/api/post", createPost);
router.get("/api/post/:id", getPostById);
router.patch("/api/post/:id", updatePostName);
router.patch("/api/post/:id/user", updatePostUser);
router.get("/api/post/:id/user", getPostUser);
router.delete("/api/post/:id", deletePost);

export default router;
