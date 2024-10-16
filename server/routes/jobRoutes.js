import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { getJobs, postJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/create",protectRoute,postJobs);
router.get("/get",protectRoute,getJobs);

export default router;