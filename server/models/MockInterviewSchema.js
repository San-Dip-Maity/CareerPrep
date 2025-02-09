import mongoose from "mongoose";

const MockInterviewSchema = new mongoose.Schema({
    jsonMockResp: {
        type: Array,
        required: true,
    },
    jobPosition: {
        type: String,
        required: true,
    },
    jobDesc: {
        type: String,
        required: true,
    },
    jobExperience: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: String, 
        required: true,
    },
    mockId: {
        type: String,
        unique: true,
        required: true,
    },
}, { timestamps: true });

export const MockInterview = mongoose.model("MockInterview", MockInterviewSchema);