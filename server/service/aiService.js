import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInterviewQuestion = async (role) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are an expert interviewer. Generate a technical interview question for a "${role}". The question should be clear, relevant, and challenging.`;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("AI Error:", error);
        throw new Error("Failed to fetch AI feedback: " + error.message);
    }
};
