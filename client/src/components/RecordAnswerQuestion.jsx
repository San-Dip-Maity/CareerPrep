import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, StopCircle, Webcam as WebcamIcon } from 'lucide-react'
import useSpeechToText from 'react-hook-speech-to-text'
import toast from 'react-hot-toast'
import axios from 'axios'
import { proxy } from '../utils/constUtils'

const RecordAnswerQuestion = ({questions,activeQuestionIndex}) => {
    const [userAnswer,setUserAnswer] = useState('');
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
        useLegacyResults: false
      });

      useEffect(() => {
          results.map((result) => (
            setUserAnswer(prevAns=>prevAns+result?.transcript)
          ))
      }, [results]);

      const SaveUserAnswers= async () => {
        if(isRecording){
          stopSpeechToText()
          if(userAnswer?.length<10){
            toast.error("Eror while saving your answer,Please record again");
            return ;
          }

          try {
            setLoadingFeedback(true);
            const response = await axios.post(
              `${proxy}interview/generate-feedback`,
              {
                question: questions[activeQuestionIndex]?.question,
                userAnswer: userAnswer
            },
            { withCredentials: true }
            );
            console.log("Feedback:", response.data.feedback);
            setFeedback(response.data.feedback);
            toast.success("Answer Saved Successfully");
          } catch (error) {
            console.error("Error fetching AI feedback:", error);
            toast.error("Failed to get feedback. Try again.");
          } finally{
            setLoadingFeedback(false);
          }
        }else{
          startSpeechToText();
        }
      }


  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-20 justify-center items-center bg-violet-200 rounded-lg p-5  shadow-lg '>
        <WebcamIcon width={200} height={200} className='absolute' />
        <Webcam
        mirrored={true}
        style={{
            height:300,
            width:"100%",
            zIndex:10,
        }}
         />
    </div>
    
    <button className=' my-10 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-30'
    onClick={SaveUserAnswers}
    >
        {isRecording?
        <h2 className='text-red-500 flex gap-2'>
            <StopCircle />Stop Recording
        </h2>
        :
        <h2 className='text-white-600 flex gap-2 items-center'>
            <Mic />Start Recording
            </h2>}</button>
        <button
                    className='px-6 py-3 mb-5 rounded-lg font-semibold text-white transition-all duration-300
                    bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500'
                    onClick={() => console.log(userAnswer)}
                >
                    Show User Answer
                </button>
    </div>
  )
}
export default RecordAnswerQuestion