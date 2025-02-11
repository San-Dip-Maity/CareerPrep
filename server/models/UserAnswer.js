import mongoose from "mongoose";

const userAnswerSchema = new mongoose.Schema({
    mockIdRef:{
        type: mongoose.Schema.Types.String, 
        ref: "MockInterviewSchema",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    correctAns: {
        type: String
    },
    userAnswer: {
        type: String
    },
    feedback: {
        type: String
    },
    rating: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserAnswer = mongoose.model("UserAnswer", userAnswerSchema);

export default UserAnswer;
