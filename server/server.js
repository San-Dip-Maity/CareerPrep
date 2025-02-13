import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import mockInterviewRoute from "./routes/mockInterviewRoute.js"
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import companyRoutes from "./routes/companyRoute.js";
import savevedJobsRoutes from "./routes/savedJobsRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import faceRoutes from "./routes/faceRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.REACT_APP_API_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;



app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/company", companyRoutes); 
app.use("/api/saved-jobs", savevedJobsRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/interview",mockInterviewRoute);
app.use("/api/face",faceRoutes);

app.get("/", (req,res)=>{
  return res.json({appName: "CareerPrep"})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
