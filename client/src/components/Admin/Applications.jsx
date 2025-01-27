import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { proxy } from '../../utils/constUtils';

const ApplicationStatus = {
  ACCEPTED: 'approved',
  REJECTED: 'rejected',
  PENDING: 'pending'
};

const ApplicationRow = ({ application, user, onUpdateStatus }) => {
  return (
    <motion.tr
      className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-4 py-3 dark:text-white">{user?.fullName || 'Loading...'}</td>
      <td className="px-4 py-3 dark:text-white">{user?.email || 'Loading...'}</td>
      <td className="px-4 py-3 dark:text-white">{application.jobId.title}</td>
      <td className="px-4 py-3 dark:text-white">
        <select
          value={application.status}
          onChange={(e) => onUpdateStatus(application._id, e.target.value)}
          className="w-full p-2 rounded bg-white dark:bg-gray-800 border"
        >
          {Object.values(ApplicationStatus).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </td>
    </motion.tr>
  );
};

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState({}); // To store user data mapped by userId

  // Fetch user details for all unique user IDs
  const fetchUserDetails = async (userIds) => {
    try {
      // Batch request for user data
      const responses = await Promise.all(
        userIds.map((userId) => axios.get(`${proxy}auth/getuser/${userId}`, { withCredentials: true }))
      );
      
      const usersData = responses.reduce((acc, response) => {
        const user = response.data.user;
        if (user) {
          acc[user._id] = user;
        }
        return acc;
      }, {});

      return usersData;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return {};
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log('Fetching applications...');
        const response = await axios.get(`${proxy}applications/applicant`, { withCredentials: true });
        const applicationsData = response.data.applications;
        setApplications(applicationsData);

        const uniqueUserIds = [...new Set(applicationsData.map((app) => app.userId))];
        const usersData = await fetchUserDetails(uniqueUserIds);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching applications or user data:', error);
      }
    };

    fetchApplications();
  }, []);

  const updateApplicationStatus = (id, newStatus) => {
    setApplications((applications) =>
      applications.map((app) =>
        app._id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <motion.div
        className="container mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Job Applications
          </h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 dark:text-white">Name</th>
                <th className="px-4 py-3 dark:text-white">Email</th>
                <th className="px-4 py-3 dark:text-white">Position</th>
                <th className="px-4 py-3 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <ApplicationRow
                  key={application._id}
                  application={application}
                  user={users[application.userId]} // Accessing user data by userId
                  onUpdateStatus={updateApplicationStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
