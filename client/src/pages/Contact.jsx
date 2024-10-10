import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

const InputField = ({ label, name, register, errors, type = "text" }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      {...register(name, { required: `${label} is required` })}
      className={`w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
        errors[name] ? 'border-red-500' : 'border-gray-300'
      }`}
    />
    {errors[name] && (
      <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
    )}
  </div>
);

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the form data to your backend
    alert("Form submitted successfully!");
  };

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
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField 
                label="Full Name" 
                name="fullName" 
                register={register} 
                errors={errors} 
              />
              <InputField 
                label="Email" 
                name="email" 
                type="email" 
                register={register} 
                errors={errors} 
              />
              <InputField 
                label="Subject" 
                name="subject" 
                register={register} 
                errors={errors} 
              />
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message", { required: "Message is required" })}
                  rows="4"
                  className={`w-full p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-center dark:text-white">Other Ways to Reach Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Email", content: "sandipmaity21052003@gmail.com" },
              { title: "Phone", content: "+91 7908729570" },
              { title: "Address", content: "Kolkata, West Bengal, India 700144" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}