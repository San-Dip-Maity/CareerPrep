import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { proxy } from "../../../utils/constUtils";


const FeedBack = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const navigate = useNavigate();

  const { mockId } = useParams();

useEffect(() => {
  const fetchAllfeedback = async () => {
    try {
      const response = await axios.get(
        `${proxy}interview/generate-allfeedback/${mockId}`,
        { withCredentials: true }
      );
      console.log("All Feedback:", response.data);
      setFeedback(response.data);
      const totalRating = response.data.reduce((sum, item) => sum + Number(item.rating), 0);
      const avgRating = response.data.length ? (totalRating / response.data.length).toFixed(1) : 0;
      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };
  fetchAllfeedback();
}, [mockId]);useEffect(() => {
    const fetchAllfeedback = async () => {
      try {
        const response = await axios.get(
          `${proxy}interview/generate-allfeedback/${mockId}`,
          { withCredentials: true }
        );
        console.log("All Feedback:", response.data);
        setFeedback(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchAllfeedback();
  }, [mockId]);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold text-green-500 mb-2">
          Congratulation!
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Here is your interview feedback
        </h2>
        <p className="text-xl text-indigo-600 dark:text-indigo-400 font-semibold">
          Your overall interview rating: {averageRating}
        </p>
      </motion.div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Find below interview question with correct answer, Your answer and
        feedback for improvement
      </p>

      {/* Questions Section */}
      <div className="space-y-4">
        {feedback.map((q, index) => (
          <motion.div
            key={index}
            className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Question Header */}
            <button
              onClick={() =>
                setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
              }
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-left font-medium text-gray-800 dark:text-white">
                {q.question}
              </h3>
              {expandedQuestion === q.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
              {expandedQuestion === q.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t">
                    {/* Rating */}
                    {q.rating && (
                      <div className="mb-4">
                        <p className="text-red-500 font-medium">
                          Rating: {q.rating}
                        </p>
                      </div>
                    )}

                    {/* User Answer */}
                    {q.userAnswer && (
                      <div className="mb-4 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <p className="font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                          Your Answer:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {q.userAnswer}
                        </p>
                      </div>
                    )}

                    {/* Correct Answer */}
                    {q.correctAnswer && (
                      <div className="mb-4 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                        <p className="font-medium text-green-600 dark:text-green-400 mb-2">
                          Correct Answer:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {q.correctAnswer}
                        </p>
                      </div>
                    )}

                    {/* Feedback */}
                    {q.feedback && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">
                          Feedback:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          {q.feedback}
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Go Home Button */}
      <motion.button
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/mockInterview")}
      >
        <Home className="w-5 h-5" />
        Go Home
      </motion.button>
    </motion.div>
  );
};

export default FeedBack;
