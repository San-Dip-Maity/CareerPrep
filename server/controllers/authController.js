import User from "../models/UserSchema.js";
import generateTokenAndSetCookie from "../token/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, email, password, mobileNumber, skills } = req.body;

  if (!fullName || !email || !mobileNumber || !skills || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      fullName,
      email,
      mobileNumber,
      skills,
      password,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
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
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res
      .status(500)
      .json({ message: "Server error. Please try again later.", error });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout sucessfully" });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};
