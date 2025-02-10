import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';


const QuestionSection = ({ questions,activeQuestionIndex,setActiveQuestionIndex }) => {
  if (!questions || questions.length === 0) {
    return <div className='text-center text-gray-500 dark:text-gray-300'>No questions available</div>;
  }

  const textToSpeech = (text) => {
    if("speechSynthesis" in window){
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
    else{
        alert("Your browser does not support text to speech");
    }
  }

  return (
    <div className='p-5 m-5 border rounded-lg my-10 dark:bg-gray-800 transition-all duration-300 shadow-md'>
     <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
     {questions.map((question, index) => (
          <motion.button 
            key={index} 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveQuestionIndex(index)}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-300
              ${activeQuestionIndex === index 
                ? "bg-purple-600 text-white shadow-lg" 
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              }`}
          >
            Question {index + 1}
          </motion.button>
        ))}
     </div>
     <motion.h2 
        key={activeQuestionIndex} 
        className="my-5 text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 transition-opacity duration-500"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        {questions[activeQuestionIndex]?.question}
      </motion.h2>

      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer inline-block p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-all"
        onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
      >
        <Volume2 />
      </motion.div>

        <div className="border rounded-lg p-5 bg-violet-200 dark:bg-violet-900 mt-10 transition-all duration-300 shadow-sm">
        <h2 className="flex gap-2 items-center text-violet-700 dark:text-violet-300">
          <Lightbulb />
          <strong>Note:</strong> 
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Click on <strong>Record Answer</strong> when you are ready to answer. At the end of the interview, you will receive feedback along with the correct answers for comparison.
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
