import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { proxy } from "../utils/constUtils";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  const fetchSavedJobs = async () => {
    try {
      if (!user) return;
      setLoading(true);
      
      console.log("Fetching saved jobs...");
      const response = await axios.get(
        `${proxy}saved-jobs/getSavedJobs/${user.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
          withCredentials: true,
        }
      );
      
      console.log(response.data);
      setSavedJobs(response.data.savedJobs || []);
      
    } catch (error) {
      console.error("Error fetching saved jobs:", error);
      toast.error(error.response?.data?.message || "Error fetching saved jobs");
      setSavedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSavedJobs();
    }
  }, [user?.id]);

  const handleDeleteSavedJob = async (jobId) => {
    try {
      await axios.delete(`${proxy}saved-jobs/deleteSavedJobs/${jobId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
        withCredentials: true,
      });
      toast.success("Job removed from saved list");
      fetchSavedJobs();
    } catch (error) {
      console.error("Error deleting saved job:", error);
      toast.error(error.response?.data?.message || "Error removing saved job");
    }
  };

  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen px-10">
      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-center items-center mb-8">
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Saved Jobs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Manage your saved job listings
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : savedJobs.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-gray-800 shadow-md rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">No saved jobs found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {savedJobs.map((savedJob) => (
                <motion.div
                  key={savedJob.jobId._id}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {savedJob.jobId.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Experience: {savedJob.jobId.experience}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {savedJob.jobId.location}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Salary:{" "}
                      {savedJob.jobId.salary
                        ? `₹${(savedJob.jobId.salary / 1000).toFixed(1)}K`
                        : "Not specified"}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-2 overflow-hidden">
                      {savedJob.jobId.requirements.map((requirement, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 overflow-hidden truncate"
                          title={requirement}
                        >
                          {requirement}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Link
                      to={`/jobsearch/jobDetails/${savedJob.jobId._id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      <button>Details</button>
                    </Link>
                    <button
                      onClick={() => handleDeleteSavedJob(savedJob.jobId._id)}
                      className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default SavedJobs;
