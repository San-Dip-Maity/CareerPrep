import SavedJob from "../models/SavedJobSchema.js";

export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const savedJob = await SavedJob.create({
      userId: req.user.id,
      jobId,
    });

    res.status(200).json({
      message: "Job saved successfully",
      savedJob,
      success: true,
    });
  } catch (error) {
    console.log("Error in saveJob controller", error.message);
    res.status(500).json({
      message: "Server error, please try again",
      success: false,
    });
  }
};
export const getSavedJobs = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required", success: false });
    }

    const savedJobs = await SavedJob.find({ userId }).populate("jobId");

    if (!savedJobs || savedJobs.length === 0) {
      return res.status(404).json({ message: "No saved jobs found", success: false });
    }

    res.status(200).json({
      savedJobs,
      success: true,
    });
  } catch (error) {
    console.error("Error in getSavedJobs:", error);
    res.status(500).json({
      message: "Error retrieving saved jobs",
      error: error.message || "An unexpected error occurred",
      success: false,
    });
  }
};


export const deleteSavedJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedSavedJob = await SavedJob.findOneAndDelete({ jobId });

    if (!deletedSavedJob) {
      return res.status(404).json({ message: "Saved job not found" });
    }

    res.status(200).json({ message: "Saved job deleted successfully" });
  } catch (error) {
    console.error("Error in deleteSavedJob controller", error.message);
    res
      .status(500)
      .json({ message: "Error deleting saved job", error: error.message });
  }
};



