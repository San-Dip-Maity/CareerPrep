import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Facebook, Linkedin, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; // Import form hook
import { login, clearAllUserErrors } from "../redux/authSlice";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize form hook
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle login form submission
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    dispatch(login(formData));
  };

  // Handle authentication logic
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      toast.success("Logged in successfully");
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-8">
            <h1 className="text-3xl font-bold mb-4 text-purple-800 dark:text-white">
              Login to your Account
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Welcome back! Please enter your details.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email ID / Username
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter email id / username"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500">{errors.password.message}</span>
                )}
              </div>

              {!loading ? (
                <button
                  disabled
                  className="w-full p-2 bg-purple-600 text-white flex items-center justify-center rounded-md"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors dark:bg-purple-700 dark:hover:bg-purple-800"
                >
                  Log In
                </button>
              )}
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 text-center">
              Don't have an account?{" "}
              <Link className="text-purple-600 hover:underline dark:text-purple-400" to="/signup">
                Register here
              </Link>
            </p>

            <div className="flex items-center justify-center mt-6 space-x-4">
              <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          <div className="hidden md:block w-1/2">
            <img
              src="https://res.cloudinary.com/dvodvtbqr/image/upload/v1728742700/herologin_uqh1st.png"
              alt="Login"
              className="object-cover w-full h-full p-2"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
