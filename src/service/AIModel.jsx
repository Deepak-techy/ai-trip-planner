import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateTripPlan(promptText) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { temperature: 0.8 },
    });

    const result = await model.generateContent(promptText);
    const response = await result.response;

    let rawText = response.text()
      .replace(/```json|```/g, '')
      .replace(/Important Notes and Enhancements:[\s\S]*?(?=\}|$)/i, '') // Remove the notes section
      .replace(/(^|\s)\/\/.*$/gm, '')   // Remove single-line comments (more precise)
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .trim();

    // Dynamically remove everything after the last closing curly brace '}' of a JSON object
    const lastClosingBraceIndex = rawText.lastIndexOf('}');
    if (lastClosingBraceIndex !== -1) {
      rawText = rawText.substring(0, lastClosingBraceIndex + 1).trim();
    }

    // const parsedJSON = JSON.parse(rawText);
    return rawText;

  } catch (error) {
    console.error("Error generating trip plan:", error);
    throw error;
  }
}

