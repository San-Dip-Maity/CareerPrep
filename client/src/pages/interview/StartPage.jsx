import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import QuestionSection from '../../components/QuestionSection';
import axios from 'axios';
import { proxy } from '../../utils/constUtils';
import RecordAnswerQuestion from '../../components/RecordAnswerQuestion';

const StartPage = () => {
     const { mockId } = useParams();
     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

     const navigate = useNavigate();


    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            console.log("Fetching questions for Mock ID:", mockId);
            const response = await axios.get(
              `${proxy}interview/get-questions/${mockId}`,
              { withCredentials: true }
            );
            console.log("Received Questions:", response.data.jsonMockResp);
            setQuestions(response.data.jsonMockResp);
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
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionSection
         questions={questions}
         activeQuestionIndex={activeQuestionIndex}
         setActiveQuestionIndex={setActiveQuestionIndex}
          />

        <RecordAnswerQuestion
         questions={questions}
         activeQuestionIndex={activeQuestionIndex}
         />
    </div>
    <div className='flex justify-end mr-5 gap-6'>
      {activeQuestionIndex > 0 && 
      <button onClick={() => setActiveQuestionIndex(activeQuestionIndex-1)} className=' my-10 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-30'>Previous Question</button>}
      {activeQuestionIndex != questions?.length-1 && 
      <button onClick={() => setActiveQuestionIndex(activeQuestionIndex+1)} className=' my-10 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-30'>Next Question</button>}
      {activeQuestionIndex == questions?.length-1 && 
      <button onClick={() => navigate(`/mockInterview/${mockId}/feedback`, { replace: true })} className=' my-10 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-30'>End Interview</button>}
    </div>
    </div>
  )
}

export default StartPage