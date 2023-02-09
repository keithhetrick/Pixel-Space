import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const candidate = await User.findOne({ email }).exec();

  // if (!candidate || !candidate.active) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  // const isMatch = await candidate.comparePassword(password);

  // if (!isMatch) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }

  res
    .status(200)
    .json({ success: true, data: candidate, message: "Login successful" });
});
