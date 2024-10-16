import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setLogin as authLogin } from "../redux/authSlice"; // your Redux slice
import axios from "axios"; // Ensure axios is installed

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Actual login logic using Axios
  const login = async (data) => {
    setError(""); // Clear any previous errors
    try {
      const response = await axios.post("https://localhost:5000/api/login", data); // Replace with your API URL
      const user = response.data; // Assuming the API returns user data

      dispatch(authLogin(user)); // Store user in Redux
      navigate("/"); // Redirect to home on successful login
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred"); // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <motion.main
        className="container px-10 mx-14 md:mx-0 flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full md:w-1/2 mb-8 md:mb-0 p-8">
          <motion.h1
            className="text-4xl font-bold mb-4 text-purple-800 dark:text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Login to your Account
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome back! Select the below login methods.
          </motion.p>

          {error && <p className="text-red-600 mb-4">{error}</p>}

          <motion.form
            className="space-y-6"
            onSubmit={handleSubmit(login)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                Email ID / Username
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="email"
                placeholder="Enter email id / username"
                type="text"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                id="password"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
              />
              <div className="mt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  Show password
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-800"
            >
              Log In
            </button>
          </motion.form>

          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Don't have an account?{" "}
            <Link className="text-purple-600 hover:underline dark:text-purple-400" to="/register">
              Register here
            </Link>
          </p>

          <div className="flex items-center justify-center mt-8 space-x-4">
            <Facebook className="text-blue-600 dark:text-white w-6 h-6 cursor-pointer" />
            <Linkedin className="text-blue-500 dark:text-white w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <motion.div
          className="hidden md:block w-full md:w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/path-to-your-login-image.jpg')" }} // set your image path here
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </motion.main>
    </div>
  );
}
