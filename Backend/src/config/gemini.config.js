import { GoogleGenerativeAI } from '@google/generative-ai';
import { ApiError } from '../utils/index.js';

if (!process.env.GEMINI_API_KEY) {
  throw new Error(' GEMINI_API_KEY missing in .env');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateText = async (prompt) => {
  if (!prompt) throw new ApiError(500, 'Prompt is missing');

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
  });
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  if (!text) {
    throw new ApiError(500, 'Geimini Error to generate text');
  }

  return text;
};
