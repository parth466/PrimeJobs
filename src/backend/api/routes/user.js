import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';
import nodemailer from 'nodemailer';
import Otp from '../../models/otp.js';
import cloudinary from '../../cloudinary.js'; // Your configured Cloudinary


// import multer from 'multer';
// import path from 'path';
import fs from 'fs';
dotenv.config();
const router = express.Router();
// ✅ Allow only specific file types
const allowedMimeTypes = ['image/png', 'image/jpeg', 'application/pdf'];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PNG, JPG, and PDF allowed.'), false);
  }
};

// ✅ Create absolute path to /uploads at project root
const uploadDir = path.join(process.cwd(), 'uploads');

// ✅ Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Configure Multer to save to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
    cb(null, uniqueName);
  }
});

// ✅ Final Multer upload setup
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
});



// --- ✅ UPLOAD PROFILE PICTURE ---
router.post("/upload/profile-picture/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'profile_pictures',
      resource_type: 'image'
    });
if(result.secure_url){console.log("Image uploaded successfully:", result.secure_url);}
    // Delete the local file after uploading to Cloudinary
    fs.unlinkSync(req.file.path);
    user.profileImage = result.secure_url;
    await user.save();

    res.status(200).json({ success: true, message: "Profile picture uploaded!", filePath: result.secure_url });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// --- ✅ UPLOAD COMPANY LOGO ---
router.post("/upload/companylogo/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'company_logos',
      resource_type: 'image'
    });

    user.Logo = result.secure_url;
    await user.save();

    res.status(200).json({ success: true, message: "Company logo uploaded!", filePath: result.secure_url });
  } catch (error) {
    console.error("Error uploading company logo:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

// --- ✅ UPLOAD RESUME ---
router.post("/upload/resume/:userId", upload.single("file"), async (req, res) => {
  const { userId } = req.params;

  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded." });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    if (user.role !== "JobSeeker") {
      return res.status(403).json({ success: false, message: "Only JobSeekers can upload resumes." });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'resumes',
      resource_type: 'auto'
    });

    user.resumeLink = result.secure_url;
    await user.save();

    res.status(200).json({ success: true, message: "Resume uploaded!", fileUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
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
