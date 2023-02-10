import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";

export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // write a error that checks if the email and password are provided, and if not, return a 400 error with a message for each field missing
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
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
