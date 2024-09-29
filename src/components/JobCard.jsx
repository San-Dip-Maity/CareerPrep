import React from "react";
import { Bookmark, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const JobCard = ({ title, company, location, sift, salary, applicants, logo }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 font-sans"
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h2>
          <div className="flex items-center mt-1">
            <span className="text-sm font-medium text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-0.5 rounded">
              {sift}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              Salary: {salary}
            </span>
          </div>
        </div>
        <Bookmark
          className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          size={20}
        />
      </div>

      <div className="flex items-center mb-3">
        <img src={logo} alt={company} className="w-6 h-6 mr-2" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {company}
        </span>
      </div>

      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-4">
        <MapPin size={16} className="mr-1" />
        <span className="text-sm">{location}</span>
      </div>

      <div className="flex items-center mb-4">
        <div className="flex -space-x-2 mr-2">
          <img
            src="applicants/1.png"
            alt="Applicant 1"
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700"
          />
          <img
            src="applicants/2.png"
            alt="Applicant 2"
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700"
          />
          <img
            src="applicants/3.png"
            alt="Applicant 3"
            className="w-6 h-6 rounded-full border-2 border-white dark:border-gray-700"
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {applicants} applicants
        </span>
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded px-4 py-2 text-sm font-medium hover:bg-purple-50 dark:hover:bg-gray-600 transition-colors">
          View details
        </button>
        <button className="flex-1 bg-purple-600 text-white rounded px-4 py-2 text-sm font-medium hover:bg-purple-700 transition-colors">
          Apply now
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
