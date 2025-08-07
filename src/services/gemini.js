import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
      try to give answer in short
      don't give response in hindi use hinglish and english.
      And ensure your name is Romi but don't repeat your name on all response.
      `
    }
  });
  return response.text;
}

export default main;
