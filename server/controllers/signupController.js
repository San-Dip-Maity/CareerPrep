import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken"


export const signup = async(req, res) => {
   const { fullName, email, password, mobileNumber, skills} = req.body;

   if (!fullName || !email || !mobileNumber || !skills || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if(existingUser){
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      skills,
      password,
    });

    await newUser.save();


    const token = jwt.sign({
        userId: newUser._id,
        email: newUser.email
    },process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(201).json({
        message: 'User created successfully',
        token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.',error});
  }
   
};