import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { proxy } from "../../utils/constUtils";

const FaceRecognition = ({ userId, mockId, onFaceMismatch, onNoFace }) => {
  const videoRef = useRef(null);
  const [initialFaceDescriptor, setInitialFaceDescriptor] = useState(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      startVideo();
    };

    loadModels();
  }, []);

  useEffect(() => {
    const recognizeFace = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detections) {
        onNoFace();
        return;
      }

      if (!initialFaceDescriptor) {
        const descriptorJSON = JSON.stringify(detections.descriptor);

        // Send to backend for storage
        await axios.post(`${proxy}face/store`, {
          userId,
          mockId,
          faceDescriptor: descriptorJSON,
        });

        setInitialFaceDescriptor(detections.descriptor);
      } else {
        // Compare with stored descriptor
        const response = await axios.get(`${proxy}face/get/${mockId}`);
        const storedDescriptor = JSON.parse(response.data.faceDescriptor);
        const distance = faceapi.euclideanDistance(storedDescriptor, detections.descriptor);

        if (distance > 0.6) {
          onFaceMismatch();
        }
      }
    };

    const interval = setInterval(recognizeFace, 3000);
    return () => clearInterval(interval);
  }, [initialFaceDescriptor, onFaceMismatch, onNoFace, userId, mockId]);

  return <video ref={videoRef} autoPlay className="hidden" />;
};

export default FaceRecognition;
