import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user.js';


const router = express.Router();

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

  



  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error logging in", error });
    }
  });
  
;
export default router;
