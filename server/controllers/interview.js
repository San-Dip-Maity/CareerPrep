import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInterviewQuestions = async (req, res) => {
    try {
        const { jobRole, jobDescription, experience } = req.body;

        if (!jobRole || !jobDescription || experience === undefined) {
            return res.status(400).json({ error: "All fields (jobRole, jobDescription, experience) are required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({
            generationConfig,
        });

        const prompt = `job role: ${jobRole}, job description: ${jobDescription}, and experience level: ${experience}. Please give me 5 interview questions with answers in JSON format. The response should be a valid JSON array with "question" and "answer" fields.`;

        const result = await chatSession.sendMessage(prompt);
        let responseText = result.response.text();

        // Ensure extra text is removed
        responseText = responseText.replace(/```json|```/g, '').trim();

        console.log("Raw AI Response:", responseText);
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(responseText);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return res.status(500).json({ error: "Invalid JSON response from AI" });
        }

        console.log("AI Response (Parsed):", parsedResponse);

        res.json({ questions: parsedResponse });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate interview questions" });
    }
};
