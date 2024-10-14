import cloudinary from "../lib/cloudinary.js";
import getDataUri from "../lib/datauri.js";
import User from "../models/UserSchema.js";
import generateTokenAndSetCookie from "../token/generateToken.js";


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

    if(newUser){
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: 'User created successfully',
    });
    }else{
      res.status(400).json({error:"Invalid user data"});
    }
  } catch (error) {
    console.log("Error in signup controller",error.message);
    res.status(500).json({ message: 'Server error. Please try again later.',error});
  }
   
};

export const login = async(req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if(!isPasswordValid){
      return res.status(401).json({message:"Invalid email or password"});
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: 'Server error. Please try again later.', error });
  }
};


export const logout =(req,res) =>{
  try {
      res.cookie("jwt","",{maxAge: 0});
      res.status(200).json({message : "Logout sucessfully"})
  } catch (error) {
      console.log("Error in Logout controller",error.message);
      res.status(500).json({error:"Internal Server error"});
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills, education, experience } = req.body;
    const file = req.file; 

    let userId = req.id; 

   
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "resumes",
      });

      user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
      user.profile.resumeOriginalName = file.originalname; // Save original file name
    }

    
    if (fullname) user.fullName = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    
    if (education) user.profile.education = JSON.parse(education); 
    if (experience) user.profile.experience = JSON.parse(experience);

   
    await user.save();

   
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};