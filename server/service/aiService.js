import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getMockInterviewFeedback = async (question, userResponse) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `
        You are an expert interviewer. Evaluate the following response based on clarity, tone, and relevance.
        Question: "${question}"
        Candidate's Answer: "${userResponse}"
        Provide a structured feedback report with suggestions for improvement.
        `;

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Error:", error);
        throw new Error("Failed to fetch AI feedback: " + error.message);
    }
};
