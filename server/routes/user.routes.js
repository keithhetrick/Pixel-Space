import express from "express";
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/api/user", getAllUsers);
router.post("/api/user", createUser);
router.get("/api/user/:id", getUserById);
router.patch("/api/user/:id", updateUser);
router.delete("/api/user/:id", deleteUser);

export default router;
