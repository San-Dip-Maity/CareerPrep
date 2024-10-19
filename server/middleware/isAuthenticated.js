import jwt from "jsonwebtoken";
import User from "../models/UserSchema.js";

export const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return ;
        }
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if(!user){
                return res.status(401).json({message:"User not found"});
            }
            req.user = user;
            next();

        } catch (error) {
            throw error;
        }
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message);
        return res.status(401).json({message:"Unauthorized - Invalid token"});
    }
}