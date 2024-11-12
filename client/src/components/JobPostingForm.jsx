import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from "react-hot-toast";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { proxy } from '../utils/constUtils';

const JobPostingForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: '',
        companyId: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleSelectChange = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        setFormData(prevData => ({
          ...prevData,
          companyId: selectedCompany?._id || ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...formData,
            requirements: formData.requirements.split(','),
            salary: Number(formData.salary)
        };
        try {
            setLoading(true);
            const res = await axios.post(`${proxy}/job/create`, updatedData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-md"
        >
            <h1 className="text-3xl font-bold mb-6 dark:text-white">Post a job</h1>

            <form onSubmit={handleSubmit}>
                <motion.div 
                    className="space-y-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                >
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Title
                        </label>
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Add job title"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Description
                        </label>
                        <textarea 
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="6" 
                            placeholder="Add job description" 
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Requirements
                        </label>
                        <input 
                            type="text" 
                            id="requirements"
                            name="requirements"
                            value={formData.requirements}
                            onChange={handleInputChange}
                            placeholder="List requirements separated by commas"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Salary
                        </label>
                        <input 
                            type="number" 
                            id="salary"
                            name="salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            placeholder="Enter salary"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Location
                        </label>
                        <input 
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        >
                        </input>
                    </div>

                    <div>
                        <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Type
                        </label>
                        <select 
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        >
                            <option value="">Select job type</option>
                            <option value="remote">Remote</option>
                            <option value="onsite">On-site</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Experience
                        </label>
                        <input 
                            type="number" 
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="Years of experience"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    <div>
                        <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Position
                        </label>
                        <input 
                            type="text" 
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleInputChange}
                            placeholder="Job position"
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        />
                    </div>

                    {companies.length > 0 ? (
                        <select 
                            onChange={(e) => handleSelectChange(e.target.value.toLowerCase())}
                            className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                        >
                            <option value="">Select a Company</option>
                            {companies.map(company => (
                                <option key={company._id} value={company.name.toLowerCase()}>
                                    {company.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className='text-xs text-red-600 font-bold text-center my-3'>
                            *Please register a company first before posting a job.
                        </p>
                    )}

                    {/* Submit button */}
                    {loading ? (
                        <button className="w-full my-4 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition duration-300">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </button>
                    ) : (
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition duration-300"
                        >
                            Post Job
                        </motion.button>
                    )}
                </motion.div>
            </form>
        </motion.div>
    );
};

export default JobPostingForm;
