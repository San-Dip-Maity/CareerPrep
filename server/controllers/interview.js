import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { MockInterview } from "../models/MockInterviewSchema.js";
import { v4 as uuidv4 } from "uuid";
import UserAnswer from "../models/UserAnswer.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getAIInterviewQuestions = async (req, res) => {
    try {
        const { jobRole, jobDescription, experience, userEmail } = req.body;

        if (!jobRole || !jobDescription || experience === undefined || !userEmail) {
            return res.status(400).json({ error: "All fields (jobRole, jobDescription, experience, userEmail) are required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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

export const getAIInterviewFeedback = async (req, res) => {
    try {  
        let { question, userAnswer, mockIdRef } = req.body;
        
        if (!question || !userAnswer) {
            console.error("Missing required fields:", { question, userAnswer });
            return res.status(400).json({ error: "All fields are required." });
        }

        if (!mockIdRef) {
            const mockInterview = await MockInterview.findOne({ "jsonMockResp.question": question });
            if (mockInterview) {
                mockIdRef = mockInterview.mockId;
            } else {
                console.error("mockIdRef missing and could not be retrieved.");
                return res.status(400).json({ error: "mockIdRef is required." });
            }
        }

        const feedbackPrompt = `
        You are an AI providing feedback on interview answers. Please analyze the user's response strictly based on the given question.
        Ensure your response is in the following JSON format ONLY:
        {
          "correctAns": "The correct answer to the given question.",
          "rating": 7,
          "feedback": "Your answer is good, but you can improve by adding examples."
        }
        
        Question: ${question} 
        User Answer: ${userAnswer} 
        Please provide your response in JSON format.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const generationConfig = {
            temperature: 0.7, 
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 1024,
            responseMimeType: "text/plain",
        };

        const chatSession = model.startChat({ generationConfig });
        const result = await chatSession.sendMessage(feedbackPrompt);
        
        // Extract response text correctly
        let responseText = await result.response.text();

        // Validate JSON extraction
        const jsonMatch = responseText.match(/\{.*\}/s);
        if (!jsonMatch) {
            console.error("Invalid JSON structure from AI:", responseText);
            return res.status(500).json({ error: "AI response does not contain a valid JSON object." });
        }

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonMatch[0]);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError, "AI Response:", responseText);
            return res.status(500).json({ error: "Invalid JSON response from AI" });
        }

        const { correctAns, feedback, rating } = parsedResponse;

        const newUserAnswer = new UserAnswer({
            mockIdRef,
            question,
            correctAns,
            userAnswer,
            feedback,
            rating,
        });

        await newUserAnswer.save();

        res.json({ feedback, rating, correctAns });

    } catch (error) {
        console.error("Error fetching AI feedback:", error);
        res.status(500).json({ error: "Failed to generate AI feedback." });
    }
};


export const getAllAIInterviewFeedback = async (req, res) => {
    try {
        const { mockId } = req.params;

        if (!mockId) {
            return res.status(400).json({ error: "mockId is required." });
        }

        const feedbacks = await UserAnswer.find({ mockIdRef: mockId });

        if (!feedbacks.length) {
            return res.status(404).json({ error: "No feedback found for this mock interview." });
        }

        res.json(feedbacks);
    } catch (error) {
        console.error("Error fetching AI feedback:", error);
        res.status(500).json({ error: "Failed to fetch AI feedback." });
    }
};


export const getUserMockInterviews = async (req, res) => {
    try {
        const { userEmail } = req.query;

        if(!userEmail) {
            return res.status(400).json({ message: "User email is required." });
        }

        const interviews = await MockInterview.find({ createdBy: userEmail });

        if (!interviews.length) {
            return res.status(404).json({ message: "No mock interviews found for this user" });
        }

        res.status(200).json(interviews);
    } catch (error) {
        console.error("Error fetching mock interviews:", error);
        res.status(500).json({ message: "Server error" });
    }
};