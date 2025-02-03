import express from "express";
import { interview } from "../controllers/interview.js";

const router = express.Router();

router.post("/mock-interview",interview);

export default router;