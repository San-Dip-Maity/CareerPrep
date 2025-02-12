import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Webcam from "react-webcam";
import { Mic, StopCircle, Webcam as WebcamIcon } from "lucide-react";
import useSpeechToText from "react-hook-speech-to-text";
import toast from "react-hot-toast";
import axios from "axios";
import { proxy } from "../utils/constUtils";

const RecordAnswerQuestion = ({ questions, activeQuestionIndex }) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result?.transcript)
    );
  }, [results]);

  const SaveUserAnswers = async () => {
    if (isRecording) {
      setLoadingFeedback(true);
      stopSpeechToText();
      if (userAnswer?.length < 10) {
        setLoadingFeedback(false);
        toast.error("Eror while saving your answer,Please record again");
        return;
      }

      try {
        setLoadingFeedback(true);
        const response = await axios.post(
          `${proxy}interview/generate-feedback`,
          {
            question: questions[activeQuestionIndex]?.question,
            userAnswer: userAnswer,
            correctAns: questions[activeQuestionIndex]?.answer,
            mockIdRef: questions[activeQuestionIndex]?.mockId,
          },
          { withCredentials: true }
        );
        console.log("Feedback:", response.data);
        setFeedback(response.data.feedback);
        toast.success("Answer Saved Successfully");
      } catch (error) {
        console.error("Error fetching AI feedback:", error.message);
        toast.error("Failed to get feedback. Try again.");
      } finally {
        setLoadingFeedback(false);
      }
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-violet-200 dark:bg-purple-950 rounded-lg p-2  shadow-lg ">
        <WebcamIcon width={200} height={200} className="absolute" />
        <Webcam
          mirrored={true}
          style={{
            height: 340,
            width: "100%",
            zIndex: 0,
          }}
          className="rounded-lg"
        />
      </div>

      <button
        className=" my-10 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-30"
        onClick={SaveUserAnswers}
      >
        {loadingFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-purple-600 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
                <span className="text-gray-700 dark:text-gray-200">
                  Processing feedback...
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {isRecording ? (
          <h2 className="text-red-500 flex gap-2">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="text-white-600 flex gap-2 items-center">
            <Mic />
            Start Recording
          </h2>
        )}
      </button>
    </div>
  );
};
export default RecordAnswerQuestion;
