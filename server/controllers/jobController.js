import Job from "../models/JobSchema.js";

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
}