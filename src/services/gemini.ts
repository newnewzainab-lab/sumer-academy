import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI({ apiKey });

export async function analyzeKnowledgeGap(userInfo: string) {
  try {
    const model = "gemini-3-flash-preview";
    const prompt = `
      You are Sumer AI Navigator, an advanced career and education consultant for Iraqis.
      The academy provides three main paths:
      1. Professional (Digital skills, Work-from-home, Freelancing)
      2. University (Academic subjects for college students in Iraq)
      3. School (Subjects for school students, focusing on Grade 12 Bakaloria)
      
      Based on the following user description: "${userInfo}", 
      please provide a diagnostic assessment in BOTH Arabic and English.
      If the user is a student, identify their level (School or University).
      
      Format the response as JSON:
      {
        "assessment": "Detailed assessment of their current level and potential",
        "assessmentAr": "تقييم مفصل لمستواهم الحالي وإمكاناتهم",
        "knowledgeGap": "Key areas they need to improve",
        "knowledgeGapAr": "المجالات الرئيسية التي يحتاجون إلى تحسينها",
        "recommendedPath": ["Course 1", "Course 2", "Course 3"],
        "recommendedPathAr": ["دورة 1", "دورة 2", "دورة 3"]
      }
    `;

    const result = await genAI.models.generateContent({
      model,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(result.text || "{}");
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
}
