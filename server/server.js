import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
const corsOptions = {
  origin: process.env.REACT_APP_API_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 5000;



app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);

app.get("/", (req,res)=>{
  return res.send("AppName: CareerPrep")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
