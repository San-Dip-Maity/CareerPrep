import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { adminCheckJobCount, getJobById, getJobs, postJobs } from "../controllers/jobController.js";

const router = express.Router();

router.post("/create",protectRoute,postJobs);
router.get("/get",getJobs);
router.get("/getadminJobs",protectRoute,adminCheckJobCount);
router.get("/getJob/:id",getJobById);

export default router;