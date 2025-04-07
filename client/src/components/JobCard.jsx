import React, { useEffect, useState } from "react";
import {
  MapPin,
  Building,
  Clock,
  ListCollapseIcon,
  Bookmark,
  BookmarkCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { proxy } from "../utils/constUtils";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const JobCard = ({
  title,
  company,
  location,
  jobType,
  salary,
  experience,
  description,
  id,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await axios.get(
          `${proxy}saved-jobs/getSavedJobs/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          }
        );
        const savedJobs = response.data.savedJobs;
        setIsSaved(savedJobs.some(job => job.jobId._id === id));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    if (user) {
      checkIfSaved();
    }
  }, [id, user]);

  const handleSaveToggle = async (jobId) => {
    try {
      if (isSaved) {
        // Unsave the job
        await axios.delete(`${proxy}saved-jobs/deleteSavedJobs/${jobId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        });
        setIsSaved(false);
        toast.success("Job removed from saved list");
      } else {
        // Save the job
        await axios.post(`${proxy}saved-jobs/savejob`, 
          { jobId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          }
        );
        setIsSaved(true);
        toast.success("Job saved successfully");
      }
    } catch (error) {
      console.error("Error toggling job save:", error);
      toast.error(error.response?.data?.message || "Error updating saved job");
    }
  };

  const handleApply = async () => {
    try {
      await axios.post(
        `${proxy}applications/apply`,
        {
          jobId: id,
          userId: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error(
        error.response?.data?.message || "Error submitting application"
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {title}
          </h2>
          <div
            onClick={() => handleSaveToggle(id)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isSaved ? (
              <BookmarkCheck
                strokeWidth={2}
                size={22}
                className="text-purple-600 dark:text-purple-400"
              />
            ) : (
              <Bookmark
                strokeWidth={2}
                size={22}
                className="text-gray-600 dark:text-gray-300"
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Building size={16} className="mr-1" />
            <span className="truncate">{company}</span>
          </div>
          <div className="flex items-center">
            <MapPin size={16} className="mr-1" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <ListCollapseIcon size={16} className="mr-1" />
          <span className="truncate  max-w-[200px]">{description}</span>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
          {jobType}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {salary} LPA
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          <Clock size={12} className="mr-1" />
          {experience}+ years
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-center gap-4">
        <button
            onClick={handleApply}
            className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 text-center text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Apply Now
          </button>
          <Link
            to={`/jobsearch/jobDetails/${id}`}
            className="w-full text-center text-purple-600 bg-none border-2 border-purple-600 rounded-lg px-4 py-2 text-sm font-medium hover:bg-purple-700 hover:text-white transition-colors"
          >
            <button>More Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
