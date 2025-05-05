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
    // required: true,
  },
  appliedJobs: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
      },
      resume: {
        type: String, // URL or path to the resume file
        // required: true,
      },
      coverLetter: {
        type: String,
      },
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
export default User; // Export the user schema for use in other files
// module.exports = mongoose.model('User', userSchema);