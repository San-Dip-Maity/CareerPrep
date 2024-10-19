import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { adminCheckJobCount, getJobs, postJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/create",protectRoute,postJobs);
router.get("/get",protectRoute,getJobs);
router.post("/getadminJobs",protectRoute,adminCheckJobCount)

export default router;