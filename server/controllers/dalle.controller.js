import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import asyncHandler from "express-async-handler";

dotenv.config();

// ENVIRONMENT VARIABLES
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// OPENAI CONFIGURATION
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// CONTROLLERS
export const serverCheck = asyncHandler(async (req, res) => {
  res.send("Hello from DALL-E route 🚀🚀🚀🔥🔥🔥");
});

export const createImage = asyncHandler(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log("\nERROR: ", error);
    res.status(500).send(error?.response.data.error.message);
  }
});
