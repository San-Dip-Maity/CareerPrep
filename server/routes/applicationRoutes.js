import express from "express";
import { createApplication, getApplicationsByJob, getApplicationsByApplicant, updateApplicationStatus } from "../controllers/applicationController.js";
import { protectRoute } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post('/apply', protectRoute, createApplication); 
router.get('/job/:jobId', protectRoute, getApplicationsByJob); 
router.get('/applicant', protectRoute, getApplicationsByApplicant); 
router.patch('/:applicationId/status', protectRoute, updateApplicationStatus);

export default router;
