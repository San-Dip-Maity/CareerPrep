import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/auth",authRoutes);
app.use("/api/job",jobRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});