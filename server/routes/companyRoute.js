import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import {getCompany, getCompanyById, registerCompany} from "../controllers/companyController.js";

const router = express.Router();

router.post("/register",protectRoute, registerCompany);
router.get("/:id", getCompany);


export default router;