"use strict";

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import https from "https";
import fs from "fs";
import helmet from "helmet";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import cookieSession from "cookie-session";
import morgan from "morgan";

import connectDB from "./config/mongoose.config.js";

import postRoutes from "./routes/post.routes.js";
import dalleRoutes from "./routes/dalle.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT;
const ENVIRONMENT = process.env.NODE_ENV;
const DB = process.env.MONGODB_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const COOKIE_KEY_1 = process.env.COOKIE_KEY_1;
const COOKIE_KEY_2 = process.env.COOKIE_KEY_2;

// PASSPORT AUTH CONFIG & SERIALIZE/DESERIALIZE
const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("\nGoogle profile:", profile);
  return done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save session to cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Read session from cookie
passport.deserializeUser((id, done) => {
  done(null, id);
});

// EXPRESS
const app = express();

// morgan.token("user-type", function (req, res) {
//   return req.headers["user-type"];
// });

// MIDDLEWARE
app.use(helmet());
// app.use(morgan(":method :url :status :user-type"));
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000, // 24 hours - hrs * mins * secs * ms
    keys: [COOKIE_KEY_1, COOKIE_KEY_2],
  })
);

// Initialize passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE LOGGER
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// AUTH MIDDLEWARE FUNCTION
function checkedLoggedIn(req, res, next) {
  console.log("\nCurrent user is:", req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res
      .status(401)
      .json({ message: "You must be logged in to access this route" });
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

app.get("/api/login", (req, res) => {
  res.status(200).json({
    message: "Hello!!! You found the login route 🔥",
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
    successRedirect: "http://localhost:3001",
    session: true,
  }),
  (req, res) => {
    console.log("Google called us back!");
  }
);

app.get("/auth/logout", (req, res) => {
  req.logout();
  return res.redirect("http://localhost:3001");
});

app.get("failure", (req, res) => {
  res.status(401).json({ message: "Failed to log in!" });
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

// error & exception handling
process.on("uncaughtException", (err) => {
  console.log("\nUNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// SERVER CONFIG // HTTP
const startServer = async () => {
  try {
    connectDB(DB);
    app.listen(PORT, () =>
      console.log(`\nListening on port ${PORT} on ${ENVIRONMENT} mode`)
    );
  } catch (error) {
    console.log("\nERROR:", error);
  }
};
startServer();

// TLS CONFIG - HTTPS
// https
//   .createServer(
//     {
//       key: fs.readFileSync("key.pem"),
//       cert: fs.readFileSync("cert.pem"),
//     },
//     app
//   )
//   .listen(PORT, () => {
//     console.log(`\nListening on port ${PORT} on ${ENVIRONMENT} mode`);
//     connectDB(DB);
//   });
