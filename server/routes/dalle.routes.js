import express from "express";
import { serverCheck, createImage } from "../controllers/dalle.controller.js";

const router = express.Router();

router.get("/", serverCheck);
router.post("/api/dalle", createImage);

export default router;
