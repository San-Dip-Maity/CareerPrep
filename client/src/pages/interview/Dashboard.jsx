import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import InterviewFormPopup from "../../components/MockInterview/InterviewFormPopup";


const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const mockInterviews = [
    {
      id: 1,
      title: "Full Stack Developer",
      experience: "2 Years of Experience",
      createdAt: "05-06-2024",
    },
    {
      id: 2,
      title: "Frontend Developer",
      experience: "3 Years of Experience",
      createdAt: "10-07-2024",
    },
    {
      id: 3,
      title: "Backend Developer",
      experience: "1 Year of Experience",
      createdAt: "15-08-2024",
    },
    {
      id: 4,
      title: "Data Scientist",
      experience: "4 Years of Experience",
      createdAt: "20-06-2024",
    },
    {
      id: 5,
      title: "Machine Learning Engineer",
      experience: "2.5 Years of Experience",
      createdAt: "25-09-2024",
    },
    {
      id: 6,
      title: "DevOps Engineer",
      experience: "3 Years of Experience",
      createdAt: "30-07-2024",
    },
    {
      id: 7,
      title: "Mobile App Developer",
      experience: "1.5 Years of Experience",
      createdAt: "05-10-2024",
    },
    {
      id: 8,
      title: "UI/UX Designer",
      experience: "2 Years of Experience",
      createdAt: "12-06-2024",
    },
    {
      id: 9,
      title: "Cloud Architect",
      experience: "5 Years of Experience",
      createdAt: "18-09-2024",
    },
    {
      id: 10,
      title: "Cyber Security Analyst",
      experience: "4 Years of Experience",
      createdAt: "28-08-2024",
    }
  ];

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {!showDashboard ? (
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
                Double your chances of landing that job offer with our
                AI-powered interview prep
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>
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
                src="interview/interview.png"
                alt="AI Interview Coach"
                className="object-cover rounded-lg"
              />
            </motion.div>
          </div>
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Create and start Your AI mock interview
          </p>

          <div className="bg-purple-100 dark:bg-gray-800 rounded-lg p-4 mb-8 inline-block">
            <button
              onClick={() => setIsPopupOpen(true)}
              className="text-purple-600 dark:text-purple-400 font-semibold"
            >
              + Add New
            </button>
          </div>

          <InterviewFormPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />

          <h2 className="text-xl font-semibold mb-4 dark:text-white">
            Previous Mock Interviews
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockInterviews.map((interview) => (
              <motion.div
                key={interview.id}
                className="bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg shadow-md p-6"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "tween", stiffness: 300 }}
              >
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-1">
                  {interview.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {interview.experience}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                  Created At: {interview.createdAt}
                </p>
                <div className="flex justify-between">
                  <button className="px-4 py-2 border border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 rounded hover:bg-purple-100 dark:hover:bg-purple-600 dark:hover:text-white transition-colors">
                    Feedback
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                    Start
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
