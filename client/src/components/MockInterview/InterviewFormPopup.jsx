import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";
import { proxy } from "../../utils/constUtils";
import { Loader2 } from "lucide-react";


const InterviewFormPopup = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
    experience: "",
  });
  
  const [interviewQuestion, setInterviewQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setInterviewQuestion("");
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post(
        `${proxy}interview/generate-question`,
        {
          jobRole: formData.jobRole,
          jobDescription: formData.jobDescription,
          experience: formData.experience,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.questions);
      
      setInterviewQuestion(response.data.questions);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to generate interview question. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6 lg:p-10 overflow-hidden"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 w-full max-w-md shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Job Interview Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="jobRole"
            placeholder="Job Role (Ex: Full Stack Developer)"
            value={formData.jobRole}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all"
            required
          />
          <textarea
            name="jobDescription"
            placeholder="Tech Stack (Ex: React, Node.js, PostgreSQL)"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all"
            rows={3}
            required
          />
          <input
            type="number"
            name="experience"
            placeholder="Years of Experience (Ex: 2)"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-all"
            required
          />
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 flex items-center justify-center transition-all"
            disabled={loading}
          >
            {loading ? <><Loader2 className="mr-2 h-6 w-6 animate-spin"/>Generating...</> : "Generate Question"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        {interviewQuestion && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-md font-semibold">Generated Question:</h3>
            <p className="text-gray-800 dark:text-gray-200 mt-2">{interviewQuestion}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default InterviewFormPopup;