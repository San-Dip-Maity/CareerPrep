import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { setCompanies, setSearchCompanyByText } from "../redux/companySlice";
import { Search, Loader2 } from "lucide-react";
import CompanyCard from "../components/Admin/CompanyCard";
import { useNavigate } from "react-router-dom";
import { proxy } from "../utils/constUtils";
import axios from "axios";
import { toast } from "react-hot-toast";

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
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${proxy}company/${user.id}`);
      const data = response.data;
      dispatch(setCompanies(data.companies));
      setCompaniesList(data.companies);
    } catch (error) {
      console.error(
        "Error fetching companies:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response?.data?.message || "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCompanies();
    }
  }, [dispatch, user]);

  const handleEdit = (company) => {
    navigate(`/company/edit/${company._id}`);
  };

  const handleDelete = async (company) => {
      setDeleteLoading(true);
      try {
        await axios.delete(`${proxy}company/${company._id}`);
        toast.success("Company deleted successfully");
        fetchCompanies(); 
      } catch (error) {
        console.error("Error deleting company:", error);
        toast.error("Failed to delete company");
      } finally {
        setDeleteLoading(false);
      }
  };

  const filteredCompanies = (Array.isArray(companiesList) ? companiesList : []).filter(
    (company) =>
      company.name.toLowerCase().includes(searchText.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchText.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleNewCompany = () => {
    navigate("/company");
  };

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
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Companies
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Browse and discover companies in our network
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search companies..."
              value={searchText}
              onChange={(e) => dispatch(setSearchCompanyByText(e.target.value))}
              className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-gray-900 placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-600 dark:focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNewCompany}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
          >
            New Company
          </motion.button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
        ) : (
          <motion.div variants={containerVariants} className="grid gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company}
                onEdit={() => handleEdit(company)}
                onDelete={() => handleDelete(company)}
                disabled={deleteLoading}
              />
            ))}
            {filteredCompanies.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No companies found
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Companies;