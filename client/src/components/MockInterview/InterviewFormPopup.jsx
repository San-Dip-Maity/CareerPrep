import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const InterviewFormPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-[-16px] bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-10 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            Tell us more about your job interviewing
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 mb-6">
          Add details about your job position/role, job description and years of
          experience.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Role/Job Position
            </label>
            <input
              type="text"
              placeholder="Ex. Full Stack Developer"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Description/Tech Stack (In Short)
            </label>
            <textarea
              placeholder="Ex. React, Angular, NodeJs, MySql etc"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Years of Experience
            </label>
            <input
              type="number"
              placeholder="Ex. 0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 sm:space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              Cancel
            </button>
            <Link to="/mockInterview/startInterview">
              <button
                type="submit"
                className="px-3 py-2 sm:px-4 sm:py-2 bg-purple-600 text-white text-sm sm:text-base rounded-md hover:bg-purple-700 transition-colors"
              >
                Start Interview
              </button>
            </Link>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InterviewFormPopup;
