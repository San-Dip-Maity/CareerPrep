import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { MockInterview } from "../models/MockInterviewSchema.js";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInterviewQuestions = async (req, res) => {
    try {
        const { jobRole, jobDescription, experience, userEmail } = req.body;

        if (!jobRole || !jobDescription || experience === undefined || !userEmail) {
            return res.status(400).json({ error: "All fields (jobRole, jobDescription, experience, userEmail) are required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({ generationConfig });

        const prompt = `job role: ${jobRole}, job description: ${jobDescription}, and experience level: ${experience}. Please give me 5 interview questions with answers in JSON format. The response should be a valid JSON array with "question" and "answer" fields.`;

        const result = await chatSession.sendMessage(prompt);
        let responseText = result.response.text();

        // Ensure we extract only valid JSON
        const jsonMatch = responseText.match(/\[.*\]/s);
        if (!jsonMatch) {
            console.error("Invalid JSON structure from AI:", responseText);
            return res.status(500).json({ error: "AI response does not contain a valid JSON array." });
        }

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonMatch[0]);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            return res.status(500).json({ error: "Invalid JSON response from AI" });
        }

        const mockInterview = new MockInterview({
            jsonMockResp: parsedResponse,
            jobPosition: jobRole,
            jobDesc: jobDescription,
            jobExperience: experience,
            mockId: uuidv4(),
            createdBy: userEmail,
        });

        await mockInterview.save();
        console.log("Saved to Database:", mockInterview);

        res.json({ message: "Interview questions generated and saved successfully", mockInterview });
        console.log("Mock ID:", mockInterview.mockId);
        return(mockInterview.mockId)

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Failed to generate interview questions" });
    }
};


export const getMockInterviews = async (req, res) => {
    try {
        const mockId = req.params.mockId;
        const mockInterviews = await MockInterview.find({ mockId });

        if (!mockInterviews) {
            return res.status(404).json({ error: "No mock interviews found" });
        }

        console.log("Mock Interviews:", mockInterviews);
        res.json(mockInterviews[0]);
    } catch (error) {
        console.error("Error fetching mock interviews:", error);
        res.status(500).json({ error: "Failed to fetch mock interviews" });
    }
}