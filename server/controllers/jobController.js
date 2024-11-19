import Company from "../models/CompanySchema.js";
import Job from "../models/JobSchema.js";
import User from "../models/UserSchema.js";

export const postJobs = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.user?.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        
        if (typeof salary !== 'number' || salary <= 0) {
            return res.status(400).json({ message: 'Salary should be a positive number' });
        }

        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            company:companyId,
            userId,
        });

        res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error in postJobs controller:", error.message); // Structured error logging
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getJobs = async (req, res) => {
    try {
        const { title, location, experience, sort = "popular" } = req.query;

        // Ensure experience is a valid number or undefined
        let experienceFilter = {};
        if (experience && !isNaN(parseInt(experience))) {
            experienceFilter = { experience: parseInt(experience) };
        }

        const query = {
            $or: [
                title ? { title: { $regex: title, $options: "i" } } : null,
                location ? { location: { $regex: location, $options: "i" } } : null,
                experienceFilter.experience ? experienceFilter : null,
            ].filter(Boolean), // Remove null entries
        };

        const jobs = await Job.find(query)
            .populate({
                path: "company",
            })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found." });
        }

        // Sorting logic
        switch (sort) {
            case "popular":
                jobs.sort((a, b) => b.views - a.views);
                break;
            case "salary_high":
                jobs.sort((a, b) => b.salary - a.salary);
                break;
            case "salary_low":
                jobs.sort((a, b) => a.salary - b.salary);
                break;
            case "applications":
                jobs.sort((a, b) => b.applications.length - a.applications.length);
                break;
            case "location":
                jobs.sort((a, b) => a.location.localeCompare(b.location));
                break;
            case "recent":
                jobs.sort((a, b) => b.createdAt - a.createdAt);
                break;
            default:
                break;
        }

        return res.status(200).json({
            message: "Jobs fetched successfully.",
            jobs,
            success: true,
        });
    } catch (error) {
        console.log("Error in getJobs controller", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch jobs" });
    }
};



export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;


        const job = await Job.findById(jobId)
            .populate({
                path: "company",
            });

        if(!job){
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job fetched successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.log("Error in getJobById controller", error.message);
        res.status(500).json({
            message: "Server error. Please try again later.",
            success: false
        });
    }
}

export const adminCheckJobCount = async (req, res) => {
    try {
        const adminId = req.user.id;

        // Verify the admin's role
        const admin = await User.findById(adminId);
        if (!admin || admin.role !== "recruiter") {
            return res.status(403).json({
                message: "You are not authorized to perform this action.",
                success: false,
            });
        }

        const companies = await Company.find({ userId: adminId });
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found for this admin.",
                success: false,
            });
        }

        const companyIds = companies.map(company => company._id);
        const jobs = await Job.find({ company: { $in: companyIds } }).populate("company");

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for your companies.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Job count retrieved successfully.",
            jobCount: jobs.length,
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error in adminCheckJobCount controller:", error.message);
        return res.status(500).json({
            message: "Failed to retrieve job count.",
            error: error.message,
            success: false,
        });
    }
};

