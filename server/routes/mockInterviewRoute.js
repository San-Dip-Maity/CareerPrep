import express from "express";
import { getAIInterviewQuestions } from "../controllers/interview.js";

const router = express.Router();

router.post("/generate-question", getAIInterviewQuestions);

export default router;