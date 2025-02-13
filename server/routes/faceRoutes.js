import express from 'express';
import { getFaceDescriptor, storeFaceDescriptor } from '../controllers/faceController.js';


const router = express.Router();

router.post("/store",storeFaceDescriptor);
router.get("/get/:mockId",getFaceDescriptor);

export default router;