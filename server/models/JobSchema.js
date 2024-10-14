import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
        default: []
    }],
    salary: {
        type: Number,
        required: true,
        min: [0, 'Salary must be a positive number']
    },
    experience: {
        type: Number,
        required: true,
        min: [0, 'Experience must be a positive number']
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance']
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
        default: []
    }]
}, {
    timestamps: true
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
