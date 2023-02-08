import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";

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

// MIDDLEWARE
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// EXPRESS
const app = express();
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

// ERROR HANDLER
app.use(errorHandler);
app.use(notFound);

// SERVER
const startServer = async () => {
  try {
    connectDB(db);
    app.listen(PORT, () =>
      console.log(`\nListening on port ${PORT} on ${ENVIRONMENT} mode`)
    );
  } catch (error) {
    console.log("\nERROR:", error);
  }
};
startServer();
