import express from "express";
import { getAllPosts, postImage } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/api/post", getAllPosts);
router.post("/api/post", postImage);

export default router;
