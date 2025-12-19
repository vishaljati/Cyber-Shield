import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils";

if (!process.env.GEMINI_API_KEY) {
  throw new Error(" GEMINI_API_KEY missing in .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const DEFAULT_MODEL = "gemini-2.5-flash-lite";

export const generateText=async(prompt)=> {
  if (!prompt) throw new Error("Prompt is required");

  const model = genAI.getGenerativeModel({
    model:DEFAULT_MODEL
  });

  const result = await model.generateContent(prompt);
  if (!result) {
    throw new ApiError(500,"Geimini Error to generate text");
    
  }
  const response = result?.response || null

  return response.text();
}