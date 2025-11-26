import { GoogleGenAI } from "@google/genai";

// Safely initialize
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventSummary = async (title: string, roughNotes: string): Promise<{ excerpt: string; content: string }> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const prompt = `
      You are a technical editor for a Developer Vlog. 
      I will give you a title and some rough notes for a blog post.
      
      Task 1: Write a catchy, 2-sentence excerpt/summary (max 150 chars).
      Task 2: Expand the notes into a professional, engaging 2-paragraph blog post introduction.
      
      Title: ${title}
      Notes: ${roughNotes}
      
      Output JSON format only:
      {
        "excerpt": "...",
        "content": "..."
      }
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};