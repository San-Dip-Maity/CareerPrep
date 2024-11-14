import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";
import { proxy } from "../../utils/constUtils";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);


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

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${proxy}company/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/company/${user.id}`);
      }
    } catch (error) {
      console.log(error);
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
          <h1 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-white">
            Your Company Name
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            What would you like to give your company name? You can change this
            later.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Company Name
          </label>

          <motion.input
            whileTap={{ scale: 0.995 }}
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="JobHunt, Microsoft etc."
            className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 my-10"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/company/${user.id}`)}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            Cancel
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={registerNewCompany}
            disabled={!companyName?.trim()}
            className={`px-4 py-2 rounded-lg ${
              !companyName?.trim()
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors duration-200`}
          >
            Continue
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;
