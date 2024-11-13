import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCompanies, setSearchCompanyByText } from "../../redux/companySlice";
import { Search } from "lucide-react";
import CompanyCard from "./CompanyCard";
import { useNavigate } from "react-router-dom";
import { proxy } from "../../utils/constUtils";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Companies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.company.companies);
  const searchText = useSelector((state) => state.company.searchCompanyByText);
  const [loading, setLoading] = useState(true);
  const [companiesList, setCompaniesList] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        console.log("Fetching companies for user ID:", user.id);

        const response = await axios.get(`${proxy}company/${user.id}`);
        const data = response.data;
        console.log("Fetched companies:", data.companies);

        dispatch(setCompanies(data.companies));
        setCompaniesList(data.companies);
      } catch (error) {
        console.error(
          "Error fetching companies:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCompanies();
    }
  }, [dispatch, user]);

  const filteredCompanies = (Array.isArray(companiesList) ? companiesList : []).filter(
    (company) =>
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleClick = () => {
    navigate("/company");
  };

  console.log(companiesList);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Companies
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Browse and discover companies in our network
            </p>
          </div>

          <div className="mt-4 md:mt-0 relative">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchText}
              onChange={(e) => dispatch(setSearchCompanyByText(e.target.value))} // Dispatch action to update search text
              className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClick}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            New Company
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <motion.div variants={containerVariants} className="grid gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Companies;
