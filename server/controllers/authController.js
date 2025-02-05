import cloudinary from "../lib/cloudinary.js";
import getDataUri from "../lib/datauri.js";
import User from "../models/UserSchema.js";
import generateTokenAndSetCookie from "../token/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobileNumber,
      password,
      role,
      about,
      location = "India",
      bio,
      skills,
      experience,
      education,
    } = req.body;

    if (!fullName || !email || !mobileNumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all required fields",
        success: false,
      });
    }

    // File upload for profile photo
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "Profile photo not uploaded" });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    // Check if user exists with the same email or mobile number
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const userByMobile = await User.findOne({ mobileNumber });
    if (userByMobile) {
      return res.status(400).json({
        message: "User already exists with this mobile number.",
        success: false,
      });
    }

    // Parse skills, experience, and education if they’re provided as strings
    const skillsArray = skills ? skills.split(",") : [];
    const experienceArray = experience ? JSON.parse(experience) : [];
    const educationArray = education ? JSON.parse(education) : [];

    // Create new user with all fields
    await User.create({
      fullName,
      email,
      mobileNumber,
      password,
      role,
      about,
      location,
      profile: {
        bio,
        skills: skillsArray,
        profilePhoto: cloudResponse.secure_url,
        experience: experienceArray,
        education: educationArray,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log("Error in Signup controller", error.message);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Please check your email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error in Login controller", error.message);
    return res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout sucessfully" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({
      error: "Server error. Please try again later.",
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Return all the user's details
    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
        about: user.about,
        location: user.location,
        profilePhoto: user.profile.profilePhoto,
        bio: user.profile.bio,
        skills: user.profile.skills,
        experiences: user.profile.experience, // Correct field
        educations: user.profile.education, // Correct field
        resume: user.profile.resume,
        resumeOriginalName: user.profile.resumeOriginalName,
      },
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      email,
      mobileNumber,
      bio,
      skills,
      education,
      experience,
    } = req.body;
    const file = req.file;
    let userId = req.user._id;

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
    if (mobileNumber) user.mobileNumber = mobileNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (education) user.profile.education = JSON.parse(education);
    if (experience) user.profile.experience = JSON.parse(experience);

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullName,
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

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
