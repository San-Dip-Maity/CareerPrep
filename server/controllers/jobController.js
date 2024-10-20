import Job from "../models/JobSchema.js";
import User from "../models/UserSchema.js";

export const postJobs = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experience: experience,
            position,
            company: companyId,
            created_by: userId
        });
        res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log("Error in postJobs controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getJobs = async (req,res) => {
    try {
        const {title,location, experience,sort = "popular"} = req.query;
        const query = {
            $or:[
                {title: {$regex: title, $options: "i"}},
                {location: {$regex: location, $options: "i"}},
                {experience: {$get: parseInt(experience)}}
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({createdAt: -1});

        if(!jobs){
            return res.status(404).json({message: "No jobs found."});
        }

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
            success: true
        });
    } catch (error) {
        console.log("Error in getJobs controller", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch jobs" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId)
        .populate({
            path: "applications",
            populate:{
                path: "user",
                select: "fullName email"
            }
        })
        .populate("company","name location");

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
        const adminId = req.id;

        const admin  = await User.findById(adminId);
        if(!admin || admin.role !== "admin"){
            return res.status(403).json({message: "You are not authorized to perform this action."});
        }

        const jobCount = await Job.find({created_by: adminId}).populate({
            path: "company",
            createdAt: -1
        });

        if(!jobCount){
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        };

        return res.status(200).json({
            message: "Job count retrieved successfully.",
            jobCount,
            success: true
        });
    } catch (error) {
        console.log("Error in adminCheckJobCount controller", error.message);
        res.status(500).json({ error: "Failed to retrieve job count" , success: false});
        
    }
};