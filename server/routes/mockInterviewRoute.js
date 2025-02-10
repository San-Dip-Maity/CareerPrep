import express from "express";
import { getAIInterviewFeedback, getAIInterviewQuestions, getMockInterviews } from "../controllers/interview.js";

const router = express.Router();

router.post("/generate-question", getAIInterviewQuestions);
router.get("/get-questions/:mockId", getMockInterviews);
router.post("/generate-feedback", getAIInterviewFeedback);

export default router;