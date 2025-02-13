import mongoose from "mongoose";

const FaceSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    mockId:{
        type: String,
        required: true
    },
    faceDescriptor:{
        type: String,
        required: true
    }
});

const FaceDescriptor = mongoose.model("FaceDescriptor", FaceSchema);

export default FaceDescriptor;