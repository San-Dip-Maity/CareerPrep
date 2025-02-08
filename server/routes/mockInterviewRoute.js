import express from "express";
import { generateQuestion } from "../controllers/interview.js";

const router = express.Router();

router.post("/generate-question",generateQuestion);

export default router;