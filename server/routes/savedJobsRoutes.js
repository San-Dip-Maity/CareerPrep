import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { deleteSavedJob, getSavedJobs, saveJob } from "../controllers/savedJobsController.js";


const router = express.Router();

router.post("/savejob", protectRoute, saveJob);
router.get("/getSavedJobs/:userId",protectRoute, getSavedJobs);
router.delete("/deleteSavedJobs/:jobId", protectRoute, deleteSavedJob);


export default router;