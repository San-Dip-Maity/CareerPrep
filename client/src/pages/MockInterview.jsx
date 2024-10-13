import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MockInterview = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-purple-50 dark:bg-gray-900 py-10 min-h-[60vh] px-10"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4 dark:text-white">
              Your Personal AI Interview Coach
            </h1>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Double your chances of landing that job offer with our AI-powered
              interview prep
            </p>
            <div className="flex space-x-4">
              <Link to="dashboard">
                <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight size={16} />
                </button>
              </Link>
              <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded hover:bg-purple-700 hover:text-white dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-600 transition-colors duration-300">
                Watch Video
              </button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <img
              src="https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742702/interview_rqvmul.png"
              alt="AI Interview Coach"
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default MockInterview;
