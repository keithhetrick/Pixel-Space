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

export const refreshCookie = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res.status(403).json({ success: false, message: "Forbidden" });

      const candidate = await User.findOne({
        username: decoded.username,
      }).exec();

      if (!candidate)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: candidate.username,
            roles: candidate.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};
