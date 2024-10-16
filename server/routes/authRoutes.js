import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", singleUpload, signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/profile/update", protectRoute, singleUpload, updateProfile);

export default router;
