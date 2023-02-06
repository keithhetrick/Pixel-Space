import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/mongoose.config.js";

import postRoutes from "./routes/post.routes.js";
import dalleRoutes from "./routes/dalle.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

// ENVIRONMENT VARIABLES
const PORT = process.env.PORT;
const db = process.env.MONGODB_URL;
// const db = process.env.DB;

// EXPRESS
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

// ROUTES
app.use("/", postRoutes);
app.use("/", dalleRoutes);
app.use("/", userRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

// SERVER
const startServer = async () => {
  try {
    connectDB(db);
    app.listen(PORT, () => console.log(`\nListening on port ${PORT}`));
  } catch (error) {
    console.log("\nERROR:", error);
  }
};
startServer();
