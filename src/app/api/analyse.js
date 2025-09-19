import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const { text } = req.body;

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(text);

  res.status(200).json({ response: result.response.text() });
}
