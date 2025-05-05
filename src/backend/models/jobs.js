import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
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
    },
    salary: {
        type: Number,
        required: true,
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
        ref: 'User', // Assuming you have a User model for recruiters
        required: true,
    },
    applicants: [
        {
            seekerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Assuming you have a User model for work seekers
            },
            resume: {
                type: String, // URL or path to the resume file
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Job', jobSchema);