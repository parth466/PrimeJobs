import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: "Remote", // Default to "Remote"
    },
    salary: {
      type: Number,
      required: false, // Optional salary field
    },
    jobType: {
      type: String,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance'],
      required: true,
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to recruiter
      required: true,
    },
    applicants: [
      {
        seekerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User', // Reference to work seeker
        },
        resume: {
          type: String, // URL or path to resume file
          required: true,
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
    status: {
      type: String,
      enum: ['Open', 'Closed', 'Filled'],
      default: 'Open',
    },
    category: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

export default mongoose.model('Job', jobSchema);
