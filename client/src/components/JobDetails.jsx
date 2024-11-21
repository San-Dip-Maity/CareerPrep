import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Building,
  Clock,
  ListCollapseIcon,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { proxy } from "../utils/constUtils";

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      console.log(id);
      const response = await axios.get(`${proxy}job/getJob/${id}`);
      console.log(response.data.job);
      setJob(response.data.job);
    };
    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-3xl mx-auto my-10"
    >
      <button
        onClick={handleGoBack}
        className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {job.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mt-2">
            <div className="flex items-center">
              <Building size={18} className="mr-2" />
              <span>{job.company?.name || "Company not specified"}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>{job.location || "Location not specified"}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-2" />
              <span>{job.experience || "Experience not specified"}+ years</span>
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {job.jobType || "Job type not specified"}
            </div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {job.salary ? `${job.salary} per annum` : "Salary not specified"}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Job Description
          </h2>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2">
            <ListCollapseIcon size={18} className="mr-4" />
            <p>{job.description || "No description available"}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Job Requirements
          </h2>
          <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2 overflow-x-scroll">
            <ListCollapseIcon size={18} className="mr-4" />
            {job.requirements.map((requirement, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded shadow m-1"
              >
                {requirement}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-purple-600 text-white rounded-lg px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            <span>Apply Now</span>
            <ArrowRight size={18} className="ml-2" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;
