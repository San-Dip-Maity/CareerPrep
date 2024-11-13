import express from "express";
import { protectRoute } from "../middleware/isAuthenticated.js";
import {deleteCompany, getCompany, getCompanyById, registerCompany, updateCompany} from "../controllers/companyController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/register",protectRoute, registerCompany);
router.get("/:id", getCompany);
router.get("/get/:id", getCompanyById);
router.put('/edit/:id',upload.single('logo'), updateCompany);
router.delete('/:id', deleteCompany);


export default router;