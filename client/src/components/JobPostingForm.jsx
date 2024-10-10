import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const JobPostingForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        tags: '',
        jobRole: '',
        minSalary: '',
        maxSalary: '',
        vacancies: '',
        jobLevel: '',
        country: '',
        city: '',
        jobDescription: '',
        companyLogo: null,
        jobType: '',
        industry: '',
        experience: '',
        education: '',
        skills: '',
        applicationDeadline: '',
        workAuthorization: '',
        companyWebsite: '',
        benefits: '',
        contactEmail: ''
      });
    
      const [countries, setCountries] = useState([]);
      const [cities, setCities] = useState([]);
      const [isLoadingCities, setIsLoadingCities] = useState(false);
    
      useEffect(() => {
        axios.get('https://restcountries.com/v3.1/all')
          .then(response => {
            const countryNames = response.data.map(country => country.name.common).sort();
            setCountries(countryNames);
          })
          .catch(error => {
            console.error('Error fetching countries:', error);
          });
      }, []);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
    
        if (name === 'country') {
          setIsLoadingCities(true);
          axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
            country: value
          })
            .then(response => {
              setCities(response.data.data);
              setFormData(prevData => ({ ...prevData, city: '' }));
            })
            .catch(error => {
              console.error('Error fetching cities:', error);
            })
            .finally(() => {
              setIsLoadingCities(false);
            });
        }
      };
    
      const handleFileChange = (e) => {
        setFormData(prevData => ({
          ...prevData,
          companyLogo: e.target.files[0]
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
      };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto my-8 p-6 bg-white dark:bg-gray-800 rounded-md"
    >
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Post a job</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Find the best talent for your company
      </p>

      <form onSubmit={handleSubmit}>
        <motion.div 
          className="space-y-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title
            </label>
            <input 
              type="text" 
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Add job title, role vacancies etc" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tags
              </label>
              <input 
                type="text" 
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="Job keyword, tags etc.." 
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Role
              </label>
              <select 
                id="jobRole"
                name="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option value="">Select...</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>

          {/* Country Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <select 
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              >
                <option value="">Select...</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* City Selection */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                City
              </label>
              <select 
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                disabled={!cities.length || isLoadingCities}
              >
                <option value="">{isLoadingCities ? 'Loading cities...' : 'Select...'}</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Description
            </label>
            <textarea 
              id="jobDescription"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              rows="6" 
              placeholder="Add your description..." 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            ></textarea>
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
              <option value="">Select...</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Industry
            </label>
            <input 
              type="text" 
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Industry" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Experience Required (Years)
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
            <label htmlFor="education" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Education Level
            </label>
            <input 
              type="text" 
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Minimum education required" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Skills Required
            </label>
            <input 
              type="text" 
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="List required skills" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Application Deadline
            </label>
            <input 
              type="date" 
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="workAuthorization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Work Authorization Required
            </label>
            <input 
              type="text" 
              id="workAuthorization"
              name="workAuthorization"
              value={formData.workAuthorization}
              onChange={handleInputChange}
              placeholder="Work authorization requirements" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Website (Optional)
            </label>
            <input 
              type="url" 
              id="companyWebsite"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              placeholder="https://example.com" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Benefits
            </label>
            <textarea 
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              rows="3" 
              placeholder="List any additional benefits..." 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            ></textarea>
          </div>

          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contact Email
            </label>
            <input 
              type="email" 
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleInputChange}
              placeholder="Contact email for job application" 
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>

          <div>
            <label htmlFor="companyLogo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Company Logo
            </label>
            <input 
              type="file" 
              id="companyLogo"
              name="companyLogo"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>


          {/* Other form fields go here */}
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition duration-300"
          >
            Post Job
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default JobPostingForm;
