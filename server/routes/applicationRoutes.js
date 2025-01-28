import express from "express";
import { createApplication, getApplicationsByJob, getApplicationsByApplicant, updateApplicationStatus, getAllApplicants, getApplicationsByUserid } from "../controllers/applicationController.js";
import { protectRoute } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post('/apply', protectRoute, createApplication); 
router.get('/job/:jobId', protectRoute, getApplicationsByJob); 
router.get('/applicant', protectRoute, getApplicationsByApplicant);
router.get('/allapplicant', protectRoute, getAllApplicants);
router.get('/applicant/:userId', protectRoute, getApplicationsByUserid);
router.patch('/:applicationId/status', protectRoute, updateApplicationStatus);

export default router;
