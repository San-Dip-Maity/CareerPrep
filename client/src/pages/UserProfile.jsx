import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Camera, FileText, BarChart2, Upload, MapPinHouse, Mail, Phone, UserRound } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Profile from "./Profile";

const UserProfile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [resumePdf, setResumePdf] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResumePdf(e.target.result);
        dispatch(updateUser({ resumePdf: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(updateUser({ img: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  // Mock interview performance stats
  const performanceStats = [
    { skill: "Technical Knowledge", score: 85 },
    { skill: "Communication", score: 78 },
    { skill: "Problem Solving", score: 92 },
    { skill: "Cultural Fit", score: 88 },
  ];

  return (
    <>
      {!isAuthenticated ? (
        <Profile />
      ) : (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4 sm:p-8">
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0 relative p-4 md:p-8 flex items-center justify-center">
                <div className="md:mb-[30rem] relative">
                  <img
                    className="h-48 w-48 object-cover rounded-full border-4 border-white dark:border-gray-700 shadow-lg"
                    src={user.profilePhoto}
                    alt=""
                  />
                  {isEditing && (
                    <div
                      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 cursor-pointer shadow-md"
                      onClick={() => imageInputRef.current.click()}
                    >
                      <Camera className="text-gray-600 dark:text-white w-6 h-6" />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="p-8 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <motion.h1
                    className=" text-gray-900 dark:text-white mb-2 sm:mb-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={user.fullName}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full sm:w-auto"
                      />
                    ) : (
                      <p className="text-3xl font-bold tracking-wider text-gray-600 dark:text-gray-300 uppercase flex items-center justify-center gap-2">
                        <UserRound size={26} strokeWidth={3}/>
                        {user.fullName}
                        
                      </p>
                     
                    )}
                  </motion.h1>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 shadow-md"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 shadow-md"
                    >
                      Edit
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        name="title"
                        value={user.title}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                    ) : (
                      <p className="text-xl text-gray-600 dark:text-gray-300">
                        {user.title}
                      </p>
                    )}
                  </div>

                  {/* Location, Email, Phone */}
                  <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <p className="flex items-center justify-center gap-1"><MapPinHouse size={18} /><strong>{user.location}</strong></p>
                    <p className="flex items-center justify-center gap-1"><Mail size={18}/><strong>{user.email}</strong></p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={user.mobileNumber}
                        onChange={handleChange}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-1 rounded-md"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Phone size={18} />
                        <strong>{user.mobileNumber}</strong>
                      </p>
                    )}
                  </div>

                  {/* About */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      About
                    </h2>
                    {isEditing ? (
                      <textarea
                        name="about"
                        value={user.about}
                        onChange={handleChange}
                        className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md"
                        rows="4"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {user.about}
                      </p>
                    )}
                  </div>

                  {/* Skills */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Skills
                    </h2>
                    {isEditing ? (
                      <input
                        type="text"
                        name="skills"
                        value={user.skills?.join(", ") || ""}
                        onChange={(e) =>
                          dispatch(
                            updateUser({
                              skills: e.target.value
                                .split(",")
                                .map((skill) => skill.trim()),
                            })
                          )
                        }
                        className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {user.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
                          >
                            {skill}
                          </span>
                        )) || (
                          <p className="text-gray-600 dark:text-gray-300">
                            No skills available.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Experience
                    </h2>
                    {isEditing ? (
                      user.experiences?.map((job, index) => (
                        <div key={index} className="mb-2 space-y-2">
                          <input
                            type="text"
                            name={`experience-${index}-title`}
                            value={job.title || ""}
                            onChange={(e) => {
                              const updatedExperience = [...user.experiences];
                              updatedExperience[index].title = e.target.value;
                              dispatch(
                                updateUser({ experience: updatedExperience })
                              );
                            }}
                            className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                          />
                        </div>
                      )) || <p>No experience available.</p>
                    ) : (
                      <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
                        {user.experiences?.length > 0 ? (
                          user.experiences.map((job, index) => (
                            <li key={index}>
                              <strong>{job.title}</strong> at {job.company}{" "}
                              <span className="text-gray-500 dark:text-gray-400">
                                ({job.period})
                              </span>
                            </li>
                          ))
                        ) : (
                          <p>No experience to display.</p>
                        )}
                      </ul>
                    )}
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Education
                    </h2>
                    {isEditing ? (
                      user.education?.map((edu, index) => (
                        <div key={index} className="mb-2 space-y-2">
                          <input
                            type="text"
                            name={`education-${index}-degree`}
                            value={edu.degree || ""}
                            onChange={(e) => {
                              const updatedEducation = [...user.education];
                              updatedEducation[index].degree = e.target.value;
                              dispatch(
                                updateUser({ education: updatedEducation })
                              );
                            }}
                            className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                          />
                          {/* Other inputs here */}
                        </div>
                      )) || <p>No education available.</p>
                    ) : (
                      <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
                        {user.education?.map((edu, index) => (
                          <li key={index}>
                            <strong>{edu.degree}</strong>, {edu.school}{" "}
                            <span className="text-gray-500 dark:text-gray-400">
                              ({edu.year})
                            </span>
                          </li>
                        )) || <p>No education to display.</p>}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Resume Buttons */}
                <motion.div
                  className="mt-4 flex space-x-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <button
                    onClick={() => setShowResume(!showResume)}
                    className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md"
                  >
                    <FileText className="mr-2" />
                    {showResume ? "Hide Resume" : "View Resume"}
                  </button>
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md"
                  >
                    <Upload className="mr-2" />
                    Update Resume
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="application/pdf"
                    className="hidden"
                  />
                </motion.div>

                {/* Resume Section */}
                {showResume && (
                  <motion.div
                    className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      Resume
                    </h3>
                    {resumePdf ? (
                      <div className="w-full h-96">
                        <iframe
                          src={resumePdf}
                          className="w-full h-full"
                          title="Resume PDF"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        No resume uploaded yet. Click "Update Resume" to upload
                        a PDF.
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Mock Interview Stats Button */}
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md"
                  >
                    <BarChart2 className="mr-2" />
                    {showStats
                      ? "Hide Performance Stats"
                      : "View Performance Stats"}
                  </button>
                </motion.div>

                {/* Mock Interview Performance Stats */}
                {showStats && (
                  <motion.div
                    className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                      Mock Interview Performance
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={performanceStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="skill" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Mock Interview Link */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link
                    to="/mockInterview"
                    className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 dark:text-white font-bold px-8 py-3 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:-translate-y-1"
                  >
                    Start AI Mock Interview
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
