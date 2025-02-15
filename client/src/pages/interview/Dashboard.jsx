import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import InterviewFormPopup from "../../components/MockInterview/InterviewFormPopup";
import axios from "axios";
import { proxy } from "../../utils/constUtils";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mockInterviews, setMockInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {mockId} = useParams();

  const auth = useSelector((state) => state.user) || {}; 
  const user = auth.user || {}; 
  const userEmail = user.email || "";
  

  useEffect(() => {
    if (!userEmail) return; 

    const fetchMockInterviews = async () => {
      try {
        const response = await axios.get(
          `${proxy}interview/user-mock-interviews/${mockId}?userEmail=${userEmail}`
        );
        setMockInterviews(response.data);
      } catch (error) {
        console.error("Error fetching mock interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMockInterviews();
  }, [userEmail]);




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
                  {interview.jobPosition}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-center">
                  Experience: {interview.jobExperience} years
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4 text-center">
                  Created At: {new Date(interview.createdAt).toLocaleDateString()}
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <motion.button className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl focus:ring focus:ring-blue-400"
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => navigate(`/mockInterview/${interview.mockId}/feedback`)}
                  >
                    Feedback
                    <span className="absolute inset-0 bg-white opacity-10 rounded-lg transition-opacity duration-300 hover:opacity-20"></span>
                  </motion.button>
                  <motion.button className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring focus:ring-purple-400"
                  onClick={() => navigate(`/mockinterview/startInterview/${interview.mockId}`)}
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
