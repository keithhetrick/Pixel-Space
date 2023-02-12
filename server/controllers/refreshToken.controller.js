import User from "../models/user.model";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: false });

  const candidate = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!candidate) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403); //Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser = await User.findOne({
          username: decoded.username,
        }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); //Forbidden
  }

  const newRefreshTokenArray = candidate.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        candidate.refreshToken = [...newRefreshTokenArray];
        const result = await candidate.save();
      }
      if (err || candidate.username !== decoded.username)
        return res.sendStatus(403);

      // Refresh token was still valid
      const roles = Object.values(candidate.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            roles: roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const newRefreshToken = jwt.sign(
        { username: candidate.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      // Saving refreshToken with current user
      candidate.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await candidate.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ accessToken });
    }
  );
});
