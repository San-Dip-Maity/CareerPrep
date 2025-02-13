import FaceDescriptor from "../models/FaceSchema.js";

export const storeFaceDescriptor = async (req, res) => {
    try{
        const {userId,mockId,faceDescriptor} = req.body;
        let faceData = await FaceDescriptor.findOne({userId,mockId});

        if(faceData){
            faceData.faceDescriptor = faceDescriptor;
            await faceData.save();
        }
        else{
            faceData = new FaceDescriptor({
                userId,
                mockId,
                faceDescriptor
            });
            await faceData.save();
        }
        res.json({message:"Face Descriptor saved successfully"});
    }
    catch{
       console.error("Error saving face descriptor:",error);
         res.status(500).json({error:"Failed to save face descriptor"});
    }
};
export const getFaceDescriptor = async (req, res) => {
    try {
        const { mockId } = req.params;
        const faceData = await FaceModel.findOne({ mockId });
    
        if (!faceData) {
          return res.status(404).json({ error: "No face data found" });
        }
    
        res.json(faceData);
      } catch (error) {
        console.error("Error fetching face data:", error);
        res.status(500).json({ error: "Failed to fetch face data" });
      }
};