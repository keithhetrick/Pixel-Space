import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  getUserPosts,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/api/user", getAllUsers);
router.post("/api/user", createUser);
router.get("/api/user/:id", getUserById);
router.patch("/api/user/:id", updateUser);
router.delete("/api/user/:id", deleteUser);
router.get("/api/user/:id/posts", getUserPosts);

export default router;
