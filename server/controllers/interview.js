import { getAIInterviewQuestion } from "../service/aiService.js";

export const generateQuestion = async (req,res) =>{

    try {
        const {role} = req.body;
        if (!role) {
            return res.status(400).json({ error: "Role is required." });
        }
        const question = await getAIInterviewQuestion(role);
        res.json({question})
    } catch (error) {
       res.status(500).json({error: "Internal Server Error"});
    }
};