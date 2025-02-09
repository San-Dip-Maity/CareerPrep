import express from "express";
import { getAIInterviewQuestions, getMockInterviews } from "../controllers/interview.js";

const router = express.Router();

router.post("/generate-question", getAIInterviewQuestions);
router.get("/get-questions/:mockId", getMockInterviews);

export default router;