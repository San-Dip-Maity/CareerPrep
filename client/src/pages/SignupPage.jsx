import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Linkedin, Eye, EyeOff, Upload, X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { signup, clearAllUserErrors } from "../redux/authSlice";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [experiences, setExperiences] = useState([
    { title: "", company: "", duration: "" },
  ]);
  const [educations, setEducations] = useState([
    { degree: "", institution: "", year: "" },
  ]);
  const [skillsList, setSkillsList] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
      file: null,
      about: "",
      location: "India",
      bio: "",
    },
  });

  const password = watch("password");

  const { loading, isAuthenticated, error, message } = useSelector(
    (state) => state.user
  );

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !skillsList.includes(currentSkill.trim())) {
      setSkillsList([...skillsList, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkillsList(skillsList.filter((skill) => skill !== skillToRemove));
  };

  const handleAddExperience = () => {
    setExperiences([...experiences, { title: "", company: "", duration: "" }]);
  };

  const handleRemoveExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const handleAddEducation = () => {
    setEducations([...educations, { degree: "", institution: "", year: "" }]);
  };

  const handleRemoveEducation = (index) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "file" && data[key]) {
        formData.append(key, data[key]);
      } else if (key !== "file") {
        formData.append(key, data[key]);
      }
    });

    // Add additional fields
    formData.append("skills", skillsList.join(","));
    formData.append("experience", JSON.stringify(experiences));
    formData.append("education", JSON.stringify(educations));

    dispatch(signup(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success(message);
      navigate("/");
    }
  }, [dispatch, error, loading, isAuthenticated, message, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <motion.main
        className="container px-10 my-10 max-w-2xl flex flex-col items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full p-8">
          <motion.h1
            className="text-4xl font-bold mb-4 text-purple-800 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Create your Account
          </motion.h1>
          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex flex-col items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Profile Picture
              </label>
              <div
                className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleProfilePictureClick}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long",
                  },
                })}
                placeholder="Enter Your Full Name"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Enter Your Email Address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="EnterYour Mobile Number"
              />
              {errors.mobileNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.mobileNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Choose Your Role
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-purple-600"
                    value="student"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span className="ml-2 dark:text-gray-300">Student</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-purple-600"
                    value="recruiter"
                    {...register("role", { required: "Please select a role" })}
                  />
                  <span className="ml-2 dark:text-gray-300">Recruiter</span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.role.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
                    },
                  })}
                  placeholder="Enter Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Profile Details
              </h2>

              <div className="space-y-6">
                {/* About & Bio */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      About
                    </label>
                    <textarea
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     transition-colors duration-200"
                      rows="3"
                      {...register("about")}
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Bio
                    </label>
                    <textarea
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     transition-colors duration-200"
                      rows="3"
                      {...register("bio")}
                      placeholder="Tell us about your Hobbies"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Skills
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      className="flex-1 p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                     focus:ring-2 focus:ring-purple-500 focus:border-transparent
                     text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                     transition-colors duration-200"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={handleAddSkill}
                      type="button"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                     transition-colors duration-200 font-medium"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-100 
                       px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors duration-200"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100
                         transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Experience
                  </label>
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="space-y-3 mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg 
                     bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200"
                    >
                      <div className="flex justify-between">
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Job Title"
                          className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                         transition-colors duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(index)}
                          className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300
                         transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        placeholder="Company"
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       transition-colors duration-200"
                      />
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "duration",
                            e.target.value
                          )
                        }
                        placeholder="Duration"
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       transition-colors duration-200"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddExperience}
                    className="mt-2 flex items-center gap-2 text-purple-600 dark:text-purple-400 
                   hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" /> Add Experience
                  </button>
                </div>

                {/* Education Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                    Education
                  </label>
                  {educations.map((edu, index) => (
                    <div
                      key={index}
                      className="space-y-3 mb-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg 
                     bg-gray-50 dark:bg-gray-700/50 transition-colors duration-200"
                    >
                      <div className="flex justify-between">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "degree",
                              e.target.value
                            )
                          }
                          placeholder="Degree"
                          className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                         transition-colors duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(index)}
                          className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300
                         transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) =>
                          handleEducationChange(index, "school", e.target.value)
                        }
                        placeholder="Institution"
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       transition-colors duration-200"
                      />
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) =>
                          handleEducationChange(index, "year", e.target.value)
                        }
                        placeholder="Year"
                        className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent
                       text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       transition-colors duration-200"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="mt-2 flex items-center gap-2 text-purple-600 dark:text-purple-400 
                   hover:text-purple-800 dark:hover:text-purple-300 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4" /> Add Education
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              // disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sign up" : "Signing up..."}
            </button>
          </motion.form>
        </div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                or sign up with
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <Facebook className="w-5 h-5 mr-2 text-blue-600" />
              Facebook
            </button>
            <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <Linkedin className="w-5 h-5 mr-2 text-blue-700" />
              LinkedIn
            </button>
          </div>
        </motion.div>
        <motion.p
          className="mt-8 mb-4 text-center text-sm text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Already have an account?{" "}
          <Link
            className="font-medium text-purple-600 hover:underline dark:text-purple-400"
            to="/login"
          >
            Log in
          </Link>
        </motion.p>
      </motion.main>
    </div>
  );
}
