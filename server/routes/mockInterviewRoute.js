import express from "express";
import { getAIInterviewFeedback, getAIInterviewQuestions, getAllAIInterviewFeedback, getMockInterviews, getUserMockInterviews } from "../controllers/interview.js";

const router = express.Router();

router.post("/generate-question", getAIInterviewQuestions);
router.get("/get-questions/:mockId", getMockInterviews);
router.post("/generate-feedback", getAIInterviewFeedback);
router.get("/generate-allfeedback/:mockId", getAllAIInterviewFeedback);
router.get("/user-mock-interviews/:mockId",getUserMockInterviews)

export default router;