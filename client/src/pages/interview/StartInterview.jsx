import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, AlertCircle, Laptop } from "lucide-react";

const StartInterview = () => {
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState("");
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isWebcamEnabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      fetchQuestion();
    }
  }, [isWebcamEnabled, countdown]);

  const handleEnableWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        setIsWebcamEnabled(true);
      })
      .catch((err) => {
        console.error("Error accessing media devices:", err);
        setError(
          "Failed to access webcam or microphone. Please check permissions."
        );
      });
  };

  const fetchQuestion = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generate-question`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: "Full Stack Developer" }),
      });
      if(!res.ok){
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Generated Question:", data.question);
      
      setQuestions(data.question || "No Question received"); // Assuming API response has a 'question' field
    } catch (err) {
      console.error("Error fetching AI question:", err);
    }
  };

  const submitResponse = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questions, userResponse: response }),
      });
      const data = await res.json();
      setFeedback(data.feedback); // Assuming API response has a 'feedback' field
    } catch (err) {
      console.error("Error analyzing response:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          {isWebcamEnabled ? "Preparing Your Interview" : "Let's Get Started"}
        </h1>

        {!isWebcamEnabled ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 mb-4">
                <h2 className="font-semibold mb-2 dark:text-white">
                  Job Role/Position:
                </h2>
                <p className="dark:text-gray-300">Full Stack Developer</p>

                <h2 className="font-semibold mt-4 mb-2 dark:text-white">
                  Job Description/Tech Stack:
                </h2>
                <p className="dark:text-gray-300">ReactJs, Node Js</p>

                <h2 className="font-semibold mt-4 mb-2 dark:text-white">
                  Years of Experience:
                </h2>
                <p className="dark:text-gray-300">5</p>
              </div>

              <motion.div className="relative w-full max-w-md">
                {/* Default state (visible when not hovered) */}
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-white rounded-lg p-4 shadow-lg cursor-pointer border border-gray-300"
                >
                  <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-400 text-transparent bg-clip-text shadow-lg">
                    Click here for more information
                  </p>
                </motion.div>

                {/* Actual Information Card (appears on hover) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-amber-100 dark:bg-amber-200 rounded-lg p-4 shadow-lg border border-gray-300"
                >
                  <h3 className="font-semibold mb-2 dark:text-gray-800">
                    Information
                  </h3>
                  <p className="text-sm dark:text-gray-800">
                    Enable Video Web Cam and Microphone to Start your AI
                    Generated Mock Interview. It Has 5 questions, and at the
                    end, you will get a report based on your answers.{" "}
                    <span className="font-bold">
                      NOTE: We never record your video. You can disable webcam
                      access at any time.
                    </span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
            >
              <Laptop size={80} className="text-blue-500 mb-6" />
              <button
                className="w-full bg-purple-600 text-white rounded-lg py-3 font-semibold hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
                onClick={handleEnableWebcam}
              >
                Enable Web Cam and Microphone
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center mx-auto">
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <Camera className="text-green-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">
                  Camera Ready
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mic className="text-green-500" size={24} />
                <span className="text-gray-700 dark:text-gray-300">
                  Microphone Ready
                </span>
              </div>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-6">
              {countdown > 0 ? countdown : "Go!"}
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                onClick={() => setIsWebcamEnabled(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                onClick={fetchQuestion}
              >
                I'm Ready
              </button>
            </div>

            {questions && (
              <div className="mt-4 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold">AI Interview Question:</h3>
                <p className="text-gray-800 dark:text-gray-300">{questions}</p>
                <textarea
                  className="w-full p-2 border rounded-md mt-2"
                  rows="3"
                  placeholder="Type your response here..."
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                ></textarea>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={submitResponse}
                >
                  Submit Answer
                </button>
                {feedback && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
                    <h3 className="font-semibold">AI Feedback</h3>
                    <p>{feedback}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default StartInterview;
