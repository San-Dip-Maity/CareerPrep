import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { adminCheckJobCount, getJobById, getJobs, postJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/create",protectRoute,postJobs);
router.get("/get",protectRoute,getJobs);
router.post("/getadminJobs",protectRoute,adminCheckJobCount);
router.get("/getJobs/:id",protectRoute,getJobById);

export default router;