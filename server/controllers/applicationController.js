import Application from "../models/ApplicationSchema.js";

// Create a new application
export const createApplication = async (req, res) => {
    const { job, status } = req.body;
    const applicant = req.user._id;

    try {
        const application = new Application({ job, applicant, status });
        await application.save();
        res.status(201).json({ message: "Application created successfully", application });
    } catch (error) {
        res.status(500).json({ error: "Failed to create application", message: error.message });
    }
};


export const getApplicationsByJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const applications = await Application.find({ job: jobId }).populate("applicant", "name email").populate("job", "title");
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications", message: error.message });
    }
};


export const getApplicationsByApplicant = async (req, res) => {
    const applicant = req.user._id;

    try {
        const applications = await Application.find({ applicant }).populate("job", "title company");
        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch applications", details: error.message });
    }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!['pending', 'shortlisted', 'rejected', 'hired'].includes(status)) {
        return res.status(400).json({ error: "Invalid status value" });
    }

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        ).populate("applicant", "name email").populate("job", "title");
        if (!updatedApplication) {
            return res.status(404).json({ error: "Application not found" });
        }
        res.status(200).json({ message: "Application status updated successfully", updatedApplication });
    } catch (error) {
        res.status(500).json({ error: "Failed to update application status", message: error.message });
    }
};
