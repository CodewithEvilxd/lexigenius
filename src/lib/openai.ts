// lib/openai.ts
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY, // ✅ Use environment variable
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // ✅ your deployed site
    "X-Title": "LexiGenius AI", // ✅ name of your app
  },
});
