import express from "express";
import {
  getUser,
  getUserById,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/isAuthenticated.js";
import upload, { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", upload.single('file'), signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", protectRoute, getUser);
router.get("/getuser/:id", getUserById);
router.put("/updateprofile", protectRoute, singleUpload, updateProfile);

export default router;
