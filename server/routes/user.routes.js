import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserPosts,
  postToUserPosts,
  deleteUserPost,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/api/users", getAllUsers);
router.post("/api/users", createUser);
router.get("/api/users/:id", getUserById);
router.patch("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);
router.get("/api/users/:id/posts", getUserPosts);
router.post("/api/users/:id/posts", postToUserPosts);
router.delete("/api/users/:id/posts/:postId", deleteUserPost);

export default router;
