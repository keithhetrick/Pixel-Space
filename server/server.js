import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import https from "https";
import fs from "fs";
import helmet from "helmet";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";

import connectDB from "./config/mongoose.config.js";

import postRoutes from "./routes/post.routes.js";
import dalleRoutes from "./routes/dalle.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.NODE_ENV;
const db = process.env.MONGODB_URL;

// PASSPORT AUTH CONFIG
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile:", profile);
  return done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// EXPRESS
const app = express();
app.use(helmet());

// MIDDLEWARE
app.use(passport.initialize());
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// auth middleware function
function checkedLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    res.status(401).json({ message: "You must log in!" });
  }
  next();
}

// ADDITIONAL EXPRESS CONFIG
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// LOGGER
app.use(logger);

// ROUTES
app.use("/", postRoutes);
app.use("/", dalleRoutes);
app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

// auth routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Google OAuth callback route
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
  }),
  (req, res) => {
    console.log("Google called us back!");
  }
);

app.get("/auth/logout", (req, res) => {});

app.get("failure", (req, res) => {
  return res.send("Failed to log in!");
});

// secret route
app.get("/secret", checkedLoggedIn, async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E! You found the secret route!",
  });
});

// ERROR HANDLER
app.use(errorHandler);
app.use(notFound);

// SERVER
// const startServer = async () => {
//   try {
//     connectDB(db);
//     app.listen(PORT, () =>
//       console.log(`\nListening on port ${PORT} on ${ENVIRONMENT} mode`)
//     );
//   } catch (error) {
//     console.log("\nERROR:", error);
//   }
// };
// startServer();

// TLS CONFIG - HTTPS
https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`\nListening on port ${PORT} on ${ENVIRONMENT} mode`);
    connectDB(db);
  });
