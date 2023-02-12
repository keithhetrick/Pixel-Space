import express from "express";
import { userLogin, refreshCookie } from "../controllers/auth.controller.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

// router.route("/").post(loginLimiter, userLogin);

router.post("/api/login", loginLimiter, userLogin);

router.get("/api/refresh", refreshCookie);

export default router;
