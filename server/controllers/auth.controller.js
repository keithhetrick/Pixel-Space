import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// @desc Login
// @route POST /api/login
// @access Public
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const targetLength = 6;

  if (!email && !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  } else if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  } else if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  } else if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email" });
  } else if (password.length < targetLength) {
    return res.status(400).json({
      success: false,
      message: `Password must be at least ${targetLength} characters`,
    });
  } else if (email.length < targetLength) {
    return res.status(400).json({
      success: false,
      message: `Email must be at least ${targetLength} characters`,
    });
  }

  const candidate = await User.findOne({ email }).exec();

  if (!candidate) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  // const match = await bcrypt.compare(password, candidate.password);

  // if (!match) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Invalid credentials" });
  // }

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

  const refreshToken = jwt.sign(
    { username: candidate.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Set refresh token as a cookie
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    data: candidate,
    message: "Login successful",
    accessToken,
  });
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
