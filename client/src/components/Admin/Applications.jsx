import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";
import { proxy } from "../../utils/constUtils";
import { toast } from "react-hot-toast";

const ApplicationStatus = {
  ACCEPTED: "approved",
  REJECTED: "rejected",
  PENDING: "pending",
};

const ApplicationRow = ({
  application,
  expandedId,
  onToggleExpand,
  userApplications,
  
}) => {
  const isExpanded = expandedId === application._id;

  return (
    <>
      <tr
        onClick={() => onToggleExpand(application._id)}
        className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <td className="px-4 py-3 dark:text-white flex items-center gap-2">
          {application.fullName || "Loading..."}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </td>
        <td className="px-4 py-3 dark:text-white">
          {application.email || "Loading..."}
        </td>
        <td className="px-4 py-3 dark:text-white">
          {application.mobileNumber || "Loading..."}
        </td>
      </tr>

      {isExpanded && userApplications && userApplications.length > 0 && (
        <tr>
          <td colSpan="4" className="px-4 py-3 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-white">
                Applied Positions
              </h3>
              <div className="space-y-2">
                {userApplications.map((app, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Position
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {app.jobId.title || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Status
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {app.status || ApplicationStatus.PENDING}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Applied Date
                        </p>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [userApplications, setUserApplications] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUserDetails = async (userIds) => {
    try {
      const responses = await Promise.all(
        userIds.map((userId) => axios.get(`${proxy}applications/applicant/${userId}`, { withCredentials: true }))
      );
      const userApplications = responses.map((response) => response.data.applications);
      console.log('User details responses:', userApplications);
      return userApplications;
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error(error.response?.data?.message || "Error fetching user details");
      return [];
    }
  };
  

  const handleToggleExpand = async (applicationId) => {
    if (expandedId === applicationId) {
      setExpandedId(null);
    } else {
      setExpandedId(applicationId);
      if (!userApplications[applicationId]) {
        const applications = await fetchUserDetails([applicationId]); // Wrap in an array
        setUserApplications((prev) => ({
          ...prev,
          [applicationId]: applications[0], // Use the first item from the response
        }));
      }
    }
  };
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log('Fetching applications...');
        const response = await axios.get(`${proxy}applications/allapplicant`, { withCredentials: true });
        const applicationsData = response.data.applicants;
        console.log('Applications:', applicationsData);
  
        setApplications(applicationsData);
  
        const userIds = applicationsData.map((application) => application._id);
        
        const usersData = await fetchUserDetails(userIds);
  
        const usersById = usersData.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        });

        setUsers(usersById);
        console.log('Users:', usersById);

      } catch (error) {
        console.error('Error fetching applications or user data:', error);
        toast.error(error.response?.data?.message || "Error fetching applications");
      }
    };
  
    fetchApplications();
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen p-8">
      <div className="container mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
                <th className="px-4 py-3 dark:text-white">Mobile</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <ApplicationRow
                  key={application._id}
                  application={application}
                  expandedId={expandedId}
                  onToggleExpand={handleToggleExpand}
                  userApplications={userApplications[application._id]}
                />
              ))}
              {applications.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 dark:text-white text-center"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Applications;
