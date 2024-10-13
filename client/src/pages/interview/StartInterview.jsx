import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Mic, AlertCircle, Laptop } from "lucide-react";

const StartInterview = () => {
  const [isWebcamEnabled, setIsWebcamEnabled] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isWebcamEnabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isWebcamEnabled, countdown]);

  const handleEnableWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Successfully accessed webcam and microphone
        setIsWebcamEnabled(true);
      })
      .catch((err) => {
        // Handle errors like permission denied
        console.error("Error accessing media devices:", err);
        setError("Failed to access webcam or microphone. Please check permissions.");
      });
  };

  const WebCamEnabled = () => (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center mx-auto"
    >
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-center space-x-2">
          <Camera className="text-green-500" size={24} />
          <span className="text-gray-700 dark:text-gray-300">Camera Ready</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Mic className="text-green-500" size={24} />
          <span className="text-gray-700 dark:text-gray-300">Microphone Ready</span>
        </div>
      </div>
      <div className="text-4xl font-bold text-purple-600 mb-6">
        {countdown > 0 ? countdown : "Go!"}
      </div>
      <div className="flex items-center bg-gray-100 p-4 rounded-lg mb-4 dark:bg-gray-700">
        <AlertCircle className="h-4 w-4 mr-2" />
        <p className="text-gray-700 dark:text-gray-300">
          Your interview will begin shortly. Relax and speak clearly.
        </p>
      </div>
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        onClick={() => {
          /* Handle start interview logic */
        }}
      >
        I'm Ready
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-purple-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          {isWebcamEnabled ? "Preparing Your Interview" : "Let's Get Started"}
        </h1>

        {!isWebcamEnabled ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 mb-4">
                <h2 className="font-semibold mb-2 dark:text-white">Job Role/Job Position:</h2>
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

              <div className="bg-amber-100 dark:bg-amber-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2 dark:text-gray-800">Information</h3>
                <p className="text-sm dark:text-gray-800">
                  Enable Video Web Cam and Microphone to Start your AI Generated Mock Interview.
                  It Has 5 questions, and at the end, you will get a report based on your answers.
                  <span className="font-bold">NOTE: We never record your video. You can disable webcam access at any time.</span>
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
              <Laptop size={80} className="text-blue-500 mb-6" />
              <button
                className="w-full bg-purple-600 text-white rounded-lg py-3 font-semibold hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors"
                onClick={handleEnableWebcam}
              >
                Enable Web Cam and Microphone
              </button>
            </div>
          </div>
        ) : (
          <WebCamEnabled />
        )}

        {error && (
          <div className="text-red-500 mt-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
