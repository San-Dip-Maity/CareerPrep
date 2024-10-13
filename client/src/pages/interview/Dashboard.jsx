import React, { useState } from "react";
import { motion } from "framer-motion";
import InterviewFormPopup from "../../components/MockInterview/InterviewFormPopup";


const Dashboard = () => {
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


  return (
    <div className="container mx-auto px-4 py-8 relative">
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
    </div>
  );
};

export default Dashboard;
