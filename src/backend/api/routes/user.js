import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Otp from '../../models/otp.js';
dotenv.config(); // Load environment variables from .env file
const router = express.Router();
import multer from 'multer';
import path from 'path';

const allowedMimeTypes = ["image/png", "image/jpeg", "application/pdf"]; // Allowed types

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only PNG, JPG, and PDF files are allowed."), false); // Reject the file
  }
};
// Making the multer storage 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save files in 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
 const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB limit
  },
});

//Route for Profile picture 
// Profile Picture Upload Route
router.post("/upload/profile-picture/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded or invalid file type." });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Update user document with the profile picture path
    user.profileImage = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully!",
      filePath: user.profileImage,
    });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});
//Route for Resume upload

//Post request for uploading file to uploads folder
// Resume Upload Route
router.post("/upload/resume/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded or invalid file type." });
  }

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Ensure the user is a JobSeeker
    if (user.role !== "JobSeeker") {
      return res.status(403).json({
        success: false,
        message: "Only JobSeekers can upload resumes.",
      });
    }

    // Update user document with the resume path
    user.resumeLink = `/uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully!",
      filePath: user.resumeLink,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});






router.post("/register", async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body); // Debug log

    const { name, email, password, role } = req.body;

    // Validate all fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields (name, email, password, role) are required." });
    }

    // Validate role
    if (!['Recruiter', 'JobSeeker'].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role. Must be 'Recruiter' or 'JobSeeker'." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this email." });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    console.log("✅ User registered:", newUser.email); // Optional success log
    res.status(201).json({ success: true, message: "User registered successfully." });

  } catch (error) {
    console.error("❌ Registration error:", error); // Log the error
    res.status(500).json({ success: false, message: "Internal server error during registration.", error: error.message });
  }
});

  router.post("/otp", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  // Create auth plain transport
const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const Genotp = Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit OTP

await Otp.create({ email, otp: Genotp });

const sendEmail = async () => {
  try {
    const mailOptions = {
      from: `"PrimeJobs Organization" ${process.env.SMTP_USER}`, // sender address
      to: email,
      subject: 'Welcome to PrimeJobs!',
      text: `Thanks for Connecting with us Here's the OTP:-${Genotp}!`, // plain text version
      // html: '<b>Thanks for signing up!</b>', // HTML version
    };
    

    await transport.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.status(200).json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
sendEmail();     
}catch (error) {
      console.error("❌ OTP error:", error); // Log the error
      res.status(500).json({ success: false, message: "Internal server error during OTP generation.", error: error.message });
    }
})



router.post("/login", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Find the latest OTP for the user
    const dbotp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!dbotp) {
      return res.status(401).json({ success: false, message: "No OTP found. Please request a new one." });
    }

    if (dbotp.otp !== otp) {
      return res.status(401).json({ success: false, message: "Invalid OTP" });
    }

    // Delete OTP after successful login (optional but recommended)
    await Otp.deleteOne({ _id: dbotp._id });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role:user.role,name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

router.get("/:id",async (req,res)=>{
  try{
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success:true,user});
  }
  catch (error) {
    console.error("❌ User fetch error:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
}) 
router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Build the update object only with fields that are present and not empty/null
    const fieldsToUpdate = {};
    const allowedFields = [
      "name",
      "email",
      "location",
      "bio",
      "profileImage",
      "resumeLink",
      "skills",
      "experience",
      "education",
      "company",
      "website",
      "companyLogo"
    ];

    for (const key of allowedFields) {
      const value = req.body[key];
      if (value !== undefined && value !== "") {
        fieldsToUpdate[key] = value;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, fieldsToUpdate, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ User update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default router;
