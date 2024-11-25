import Company from "../models/CompanySchema.js";
import getDataUri from "../lib/datauri.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

// Register company
export const registerCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }


    let company = await Company.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "A company with this name already exists.",
        success: false,
      });
    }

    let logo = "";
    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    company = await Company.create({
      name,
      description,
      website,
      location,
      logo,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again.",
      success: false,
    });
  }
};


// Get all companies for the user
export const getCompany = async (req, res) => {
  try {
    const userId = req.params.id; // logged-in user ID
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again.",
      success: false,
    });
  }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    if (!companyId) {
      return res.status(400).json({
        message: "Company ID is required.",
        success: false,
      });
    }
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid Company ID format.",
        success: false,
      });
    }

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again.",
      success: false,
    });
  }
};

// Update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    let logo = "";

    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again.",
      success: false,
    });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id; 

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        message: "Invalid Company ID format.",
        success: false,
      });
    }

    const company = await Company.findById(companyId);

    
    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

  //  console.log(company.userId);
  //   if (company.userId.toString() !== req.user.id) {
  //     return res.status(403).json({
  //       message: "You don't have permission to delete this company.",
  //       success: false,
  //     });
  //   }

    await Company.findByIdAndDelete(companyId);

    return res.status(200).json({
      message: "Company deleted successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again.",
      success: false,
    });
  }
};

