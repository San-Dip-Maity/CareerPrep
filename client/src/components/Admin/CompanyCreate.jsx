import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { proxy } from "../../utils/constUtils";
import { ArrowLeft, Upload } from "lucide-react";
import { useForm } from "react-hook-form";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [logo, setLogo] = useState(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      name: "",
      description: "",
      website: "",
      location: "",
    }
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const onSubmit = async (data) => {
    
    try {
     
      const res = await axios.post(`${proxy}company/register`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log('API Response:', res);

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/company/${user.id}`);
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"
      >
        <motion.div variants={itemVariants} className="my-10">
          <button
            onClick={handleGoBack}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full -ml-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white">
            Create Your Company Profile
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Fill in your company details. You can update these later.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={itemVariants}
          className="space-y-6 mb-8"

        >
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Company Name *
            </label>
            <motion.input
              whileTap={{ scale: 0.995 }}
              {...register("name", { required: "Company name is required" })}
              placeholder="JobHunt, Microsoft etc."
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <motion.textarea
              whileTap={{ scale: 0.995 }}
              {...register("description")}
              placeholder="Tell us about your company..."
              rows={4}
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Website
            </label>
            <motion.input
              whileTap={{ scale: 0.995 }}
              {...register("website", {
                pattern: {
                  value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                  message: "Please enter a valid URL"
                }
              })}
              placeholder="https://example.com"
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
            {errors.website && (
              <span className="text-red-500 text-sm">{errors.website.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Location
            </label>
            <motion.input
              whileTap={{ scale: 0.995 }}
              {...register("location")}
              placeholder="City, Country"
              className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Company Logo
            </label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <span className="mt-2 block text-sm text-gray-400">
                    Upload
                  </span>
                </div>
              </label>
              {logo && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Selected: {logo.name}
                </div>
              )}
            </div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 my-10"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/company/${user.id}`)}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
            >
              Create Company
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;