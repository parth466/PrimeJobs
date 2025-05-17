import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Recruiter', 'JobSeeker'], // Defines the role of the user
    required: true,
  },
  bio: {
    type: String, // For JobSeekers
    trim: true,
  },
  skills: {
    type: [String], // Array of skills
  },
  website:{
    type: String, // URL of the website
  },
  location:{
    type: String, // Address of the user
    trim: true,
  },
  phone:{
    type: String, // Phone number of the user
    trim: true,
  },
  profileImage: {
    type: String, // URL or path to the profile picture
  },
  resumeLink: {
    type: String, // URL or path to the resume
  },
  experience: [
    {
      company: String,
      role: String,
      duration: String,
    },
  ],
  education: [
    {
      institute: String,
      degree: String,
      year: String,
    },
  ],
  company: {
    type: String, // For Recruiters
    trim: true,
  },
  about: {
    type: String, // About the company for Recruiters
    trim: true,
  },
  logo: {
    type: String, // Company logo for Recruiters
  },
  appliedJobs: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
      },
      resume: String, // URL or path to the resume file
      coverLetter: String,
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  postedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job', 
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
