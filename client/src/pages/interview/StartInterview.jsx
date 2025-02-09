import React from "react";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import { useState } from "react";

const StartInterview = () => {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  return (
    <>
      <div className="my-10 flex justify-center flex-col items-center">
        <h2 className="font-bold text-2xl">Let's get started</h2>
        <div>
          {webcamEnabled ? (
            <Webcam
            mirrored={true}
              style={{ height: "300", width: "300" }}
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
            />
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-7 bg-slate-300 p-10 rounded-lg border" />
              <button onClick={() => setWebcamEnabled(true)} className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Enable Webcam and Microphone</button>
            </>
          )}
        </div>

          <div>
            <h2>Job Description</h2>
          </div>

      </div>
    </>
  );
};

export default StartInterview;
