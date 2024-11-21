import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Trash2, X, Loader2 } from 'lucide-react';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

const DeleteModal = ({ isOpen, onClose, onConfirm, companyName, isLoading }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40"
        />
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed top-[10rem] left-[10rem] -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Company
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete <span className="font-semibold">{companyName}</span>? 
              This action cannot be undone.
            </p>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  Delete
                </>
              )}
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const CompanyCard = ({ company, onEdit, onDelete }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(company);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

  return (
    <>
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
      >
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4 flex-1">
            <div className="w-16 h-16 flex-shrink-0">
              <img
                src={company.logo}
                alt={company.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {company.location}
              </p>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-block truncate max-w-full"
              >
                {company.website}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onEdit(company)}
              className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Edit company"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Delete company"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {company.description}
        </p>
      </motion.div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        companyName={company.name}
        isLoading={isDeleting}
      />
    </>
  );
};

export default CompanyCard;