import { getMockInterviewFeedback } from "../service/aiService.js";

export const interview = async (req,res) =>{

    try {
        const {question, userResponse} = req.body;
        if(!question || !userResponse){
            return res.status(400).json({error: "Question and response are required."})
        }
        const feedback = await getMockInterviewFeedback(question,userResponse);
        res.json({feedback})
    } catch (error) {
       res.status(500).json({error: "Internal Server Error"});
    }
};