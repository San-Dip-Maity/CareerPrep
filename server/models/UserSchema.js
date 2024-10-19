import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: "Software Engineer",
  },
  company: {
    type: String,
    required: true,
    default: "This is my first name",
  },
  period: {
    type: String,
    required: true,
    default: "This is my first name✅",
  },
});

const educationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  title: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    maxLength: 100,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["student", "recruiter"],
    default: "student",
  },
  about: { 
    type: String 
  },
  location: { 
    type: String,
    default: "India"
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String },
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profilePhoto: {
      type: String,
      required: true,
    },
    experience: [experienceSchema],
    education: [educationSchema],
  },
});

// Hash password before saving data to the database

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password in the database

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
