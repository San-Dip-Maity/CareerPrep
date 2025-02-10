import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import { Mic, Webcam as WebcamIcon } from 'lucide-react'
import useSpeechToText from 'react-hook-speech-to-text'

const RecordAnswerQuestion = () => {
    const [userAnswer,setUserAnswer] = useState('')
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
    onClick={isRecording?stopSpeechToText:startSpeechToText}
    >
        {isRecording?
        <h2 className='text-red-500 flex gap-2'>
            <Mic />Stop Recording
        </h2>
        :
        "Record Answer"}</button>
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