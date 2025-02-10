import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QuestionSection from '../../components/QuestionSection';
import axios from 'axios';
import { proxy } from '../../utils/constUtils';
import RecordAnswerQuestion from '../../components/RecordAnswerQuestion';

const StartPage = () => {
     const { mockId } = useParams();
     const [questions, setQuestions] = useState([]);
     const [loading, setLoading] = useState(true);
     const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);


    useEffect(() => {
        const fetchQuestions = async () => {
          try {
            console.log("Fetching questions for Mock ID:", mockId);
            const response = await axios.get(
              `${proxy}interview/get-questions/${mockId}`,
              { withCredentials: true }
            );
            console.log("Received Questions:", response.data.questions);
            setQuestions(response.data.questions);
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

        <RecordAnswerQuestion />
    </div>
    </div>
  )
}

export default StartPage