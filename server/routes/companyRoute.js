import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import {registerCompany} from "../controllers/companyController.js";

const router = express.Router();

router.post("/register",protectRoute, registerCompany);


export default router;