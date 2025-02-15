import React, { useEffect, useState } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AUTH_API_END_POINT, proxy } from "../../utils/constUtils";
import FaceRecognition from "../../components/Face/FaceDetector";

const StartInterview = () => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { mockId } = useParams();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      axios
        .get(`${AUTH_API_END_POINT}getuser`, { withCredentials: true })
        .then((res) => {
          localStorage.setItem("userId", res.data.id);
        })
        .catch((err) => console.error("Error fetching user:", err));
    }
  }, [userId]);

  const handleFaceMismatch = () => {
    alert("Face does not match! The interview is canceled.");
    navigate("/");
  };

  const handleNoFaceDetected = () => {
    alert("No face detected! The interview is canceled.");
    navigate("/");
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Mock ID:", mockId);
        const response = await axios.get(
          `${proxy}interview/get-questions/${mockId}`,
          { withCredentials: true }
        );
        console.log("Questions:", response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mockId) {
      fetchQuestions();
    }
  }, [mockId]);

  return (
    <div className="bg-purple-50 dark:bg-gray-900 dark:text-gray-300 min-h-screen px-10 flex flex-col items-center py-10">
      <motion.h1
        className="text-4xl lg:text-5xl font-bold mb-6 text-center dark:text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Let's Get Started
      </motion.h1>

      {userId && (
        <FaceRecognition
          userId={userId}
          mockId={mockId}
          onFaceMismatch={handleFaceMismatch}
          onNoFace={handleNoFaceDetected}
        />
      )}

      {loading ? (
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl w-full min-h-[50vh] p-6">
          <motion.div
            className="flex flex-col gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold dark:text-white">
              Interview Details
            </h2>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p>
                <strong>Job Role:</strong>{" "}
                {questions?.jobPosition
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") || "N/A"}
              </p>
              <p>
                <strong>Tech Stack:</strong>{" "}
                {questions?.jobDesc
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ") || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {questions?.jobExperience || "N/A"}
              </p>
            </div>

            <div className="p-4 bg-yellow-200 dark:bg-yellow-500 rounded-lg">
              <h2 className="flex items-center gap-2 text-orange-600 dark:text-orange-100">
                <Lightbulb /> <strong>Instructions</strong>
              </h2>
              <p className="text-gray-600 dark:text-gray-100">
                Enable your Webcam and Microphone to start the interview. You
                will get 5 questions, and at the end, you'll receive feedback.
                <br />
                <strong>Note:</strong> We do not store any video or audio data.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {webcamEnabled ? (
              <Webcam
                mirrored
                className="w-[450px] mt-2 rounded-lg border shadow-lg"
              />
            ) : (
              <>
                <WebcamIcon className="h-72 w-full my-5 bg-gray-300 dark:bg-gray-700 p-10 rounded-lg border" />
                <motion.button
                  onClick={() => setWebcamEnabled(true)}
                  className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enable Webcam and Microphone
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      )}

      <div>
        <button
          onClick={() => navigate(`/mockInterview/startPage/${mockId}`)}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
};

export default StartInterview;
