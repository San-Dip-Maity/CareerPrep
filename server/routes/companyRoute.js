import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { signinCompany } from "../controllers/companyController.js";

const router = express.Router();

router.post("/registration",protectRoute,signinCompany);


export default router;