import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/actions";
import { Camera } from "lucide-react";

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUser({ [name]: value }));
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4 sm:p-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 relative">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={user.img}
              alt="User avatar"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <Camera className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="p-8 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <motion.h1
                className="text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full sm:w-auto"
                  />
                ) : (
                  user.name
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
                <p>{user.location}</p>
                <p>{user.email}</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="bg-gray-100 dark:bg-gray-700 dark:text-white p-1 rounded-md"
                  />
                ) : (
                  <p>{user.phone}</p>
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
                    value={user.skills.join(", ")}
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
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Experience
                </h2>
                {isEditing ? (
                  user.experience.map((job, index) => (
                    <div key={index} className="mb-2 space-y-2">
                      <input
                        type="text"
                        name={`experience-${index}-title`}
                        value={job.title}
                        onChange={(e) => {
                          const updatedExperience = [...user.experience];
                          updatedExperience[index].title = e.target.value;
                          dispatch(
                            updateUser({ experience: updatedExperience })
                          );
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                      <input
                        type="text"
                        name={`experience-${index}-company`}
                        value={job.company}
                        onChange={(e) => {
                          const updatedExperience = [...user.experience];
                          updatedExperience[index].company = e.target.value;
                          dispatch(
                            updateUser({ experience: updatedExperience })
                          );
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                      <input
                        type="text"
                        name={`experience-${index}-period`}
                        value={job.period}
                        onChange={(e) => {
                          const updatedExperience = [...user.experience];
                          updatedExperience[index].period = e.target.value;
                          dispatch(
                            updateUser({ experience: updatedExperience })
                          );
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                    </div>
                  ))
                ) : (
                  <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
                    {user.experience.map((job, index) => (
                      <li key={index}>
                        <strong>{job.title}</strong> at {job.company}{" "}
                        <span className="text-gray-500 dark:text-gray-400">
                          ({job.period})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Education
                </h2>
                {isEditing ? (
                  user.education.map((edu, index) => (
                    <div key={index} className="mb-2 space-y-2">
                      <input
                        type="text"
                        name={`education-${index}-degree`}
                        value={edu.degree}
                        onChange={(e) => {
                          const updatedEducation = [...user.education];
                          updatedEducation[index].degree = e.target.value;
                          dispatch(updateUser({ education: updatedEducation }));
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                      <input
                        type="text"
                        name={`education-${index}-school`}
                        value={edu.school}
                        onChange={(e) => {
                          const updatedEducation = [...user.education];
                          updatedEducation[index].school = e.target.value;
                          dispatch(updateUser({ education: updatedEducation }));
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                      <input
                        type="text"
                        name={`education-${index}-year`}
                        value={edu.year}
                        onChange={(e) => {
                          const updatedEducation = [...user.education];
                          updatedEducation[index].year = e.target.value;
                          dispatch(updateUser({ education: updatedEducation }));
                        }}
                        className="bg-gray-100 dark:bg-gray-700 dark:text-white p-2 rounded-md w-full"
                      />
                    </div>
                  ))
                ) : (
                  <ul className="list-disc ml-6 space-y-2 text-gray-600 dark:text-gray-300">
                    {user.education.map((edu, index) => (
                      <li key={index}>
                        <strong>{edu.degree}</strong>, {edu.school}{" "}
                        <span className="text-gray-500 dark:text-gray-400">
                          ({edu.year})
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

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
  );
};

export default UserProfile;
