import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import InterviewFormPopup from "../../components/MockInterview/InterviewFormPopup";


const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-8">
      <InterviewFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl"
        >
          <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Create and start Your AI mock interview
          </p>

          <div className="bg-purple-100 dark:bg-gray-800 rounded-lg p-4 mb-8 inline-block">
            <motion.button
              onClick={() => setIsPopupOpen(true)}
              className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              + Add New
            </motion.button>
          </div>


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
                <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-2 text-center">
                  {interview.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                  {interview.experience}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 text-center">
                  Created At: {interview.createdAt}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <motion.button className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:ring focus:ring-blue-400"
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => console.log("Feedback button clicked")}
                  >
                    Feedback
                    <span className="absolute inset-0 bg-white opacity-10 rounded-lg transition-opacity duration-300 hover:opacity-20"></span>
                  </motion.button>
                  <motion.button className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring focus:ring-purple-400"
                  onClick={() => navigate("/mockinterview/startInterview")}
                  >
                    Start
                    <span className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full animate-ping"></span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
    </div>
  );
};

export default Dashboard;
