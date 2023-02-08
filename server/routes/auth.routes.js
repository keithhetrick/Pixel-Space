import express from "express";
import { userLogin } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/api/login", loginLimiter, userLogin);

export default router;
