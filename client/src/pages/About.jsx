import React from "react";
import { motion } from "framer-motion";

const TeamMember = ({ name, role, image }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={image}
      alt={name}
      className="w-32 h-32 rounded-full mx-auto mb-4"
    />
    <h3 className="text-xl font-semibold text-center dark:text-white">
      {name}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-center">{role}</p>
  </motion.div>
);

export default function About() {
  return (
    <div className="bg-purple-50 dark:bg-gray-900 min-h-screen px-10">
      <main className="container mx-auto px-4 py-8">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl lg:text-5xl font-bold mb-4 text-center dark:text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            We are dedicated to connecting talented individuals with their dream
            jobs. Our platform leverages cutting-edge technology to match job
            seekers with the perfect opportunities.
          </motion.p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white">
            Our Mission
          </h2>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-300 text-center">
              To revolutionize the job search process by providing a seamless,
              intuitive platform that empowers both job seekers and employers to
              find their perfect match.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="Sandip Maity"
              role="CEO & Founder"
              image="team-member.png"
            />
            <TeamMember name="Joy Mahata" role="CTO" image="team-member.png" />
            <TeamMember
              name="Zaheed Hossain Molla"
              role="Head of HR"
              image="team-member1.jpg"
            />
          </div>
        </motion.section>

        <motion.section
          className="mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8 text-center dark:text-white">
            Why Choose Our AI-Powered Mock Interview Platform
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Personalized Interview Questions",
                description:
                  "Receive questions customized to your specific job role and experience, ensuring a focused and relevant practice session.",
              },
              {
                title: "Real-time Feedback",
                description:
                  "Get immediate feedback on your responses, allowing you to adjust and improve your answers as you practice.",
              },
              {
                title: "Comprehensive Skill Assessment",
                description:
                  "Our platform evaluates your strengths and weaknesses to provide a detailed skill report and guide your improvements.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
