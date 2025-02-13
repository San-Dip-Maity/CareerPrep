import Application from "../models/ApplicationSchema.js";

// Create a new application
export const createApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.body;

    if (!jobId || !userId) {
      return res.status(400).json({ message: "Job ID and User ID are required." });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(409).json({ message: "You have already applied for this job." });
    }

    // Create a new application
    const application = new Application({ jobId, userId });
    await application.save();

    res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};




export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobId }).populate("userId", "companyid");

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this job." });
    }

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};

export const getApplicationsByUserid = async (req, res) => {
  try {
    const { userId } = req.params;

    const applications = await Application.find({ userId }).populate("jobId", "title company");

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};



export const getApplicationsByApplicant = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming `req.user` contains authenticated user info

    const applications = await Application.find({ userId }).populate("jobId", "title company");

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found for this user." });
    }

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};


// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Valid options are: ${validStatuses.join(", ")}` });
    }

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true } // Return the updated document
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }

    res.status(200).json({ message: "Application status updated successfully.", application });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};


// Get all users who have applied for any job
export const getAllApplicants = async (req, res) => {
  try {
    const applicants = await Application.find().populate("userId", "fullName email mobileNumber");

    if (applicants.length === 0) {
      return res.status(404).json({ message: "No applications found." });
    }

    // Extract unique users
    const uniqueUsers = [];
    const userSet = new Set();
    applicants.forEach((app) => {
      if (!userSet.has(app.userId._id.toString())) {
        userSet.add(app.userId._id.toString());
        uniqueUsers.push(app.userId);
      }
    });

    res.status(200).json({ applicants: uniqueUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
  }
};
