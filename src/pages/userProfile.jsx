import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/middleware/AuthContext";
import axios from "axios";
import { useState,useEffect } from "react";

export default function UserProfile() {
  const user = useAuth();
const {role,id} = useParams();
  const [details, setDetails] = useState({});
  // Mock data
  const navigate = useNavigate();
  const workseeker = {
    id: "123",
    name: "Aman Verma",
    email: "aman@example.com",
    bio: "Frontend Developer with 2 years of experience.",
    skills: ["React", "Tailwind", "JavaScript"],
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
    resumeLink: "/dummy-resume-aman.pdf",
    experience: [
      {
        company: "TechNova",
        role: "Frontend Developer",
        duration: "Jan 2023 - Present",
      },
    ],
    education: [
      {
        institute: "ABC University",
        degree: "BCA",
        year: "2022",
      },
    ],
  };

  const hirer = {
    id: "456",
    name: "Ritika Sharma",
    email: "ritika@hireplus.com",
    company: "HirePlus Pvt. Ltd.",
    about: "We help companies find talented tech folks!",
    profileImage: "https://randomuser.me/api/portraits/women/65.jpg",
    logo: "https://placehold.co/100x100?text=HP",
    postedJobs: [
      { title: "Frontend Intern", category: "Frontend", location: "Remote" },
      { title: "React Developer", category: "Frontend", location: "Delhi" },
    ],
  };
const API_BASE_URL = window.location.protocol === "https:"
  ? "https://primejobs.onrender.com": "http://localhost:3000";
  // const user = useAuth();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/user/${id}`, {
          params: { id },
        });
        console.log(res.data);  // Log the response to see the structure
        if (res.data.role === "JobSeeker") {
          setDetails({
            id: res.data.user._id,  // Access user id
            name: res.data.user.name,  // Correctly access the name
            email: res.data.user.email,
            bio: res.data.user.bio,
            skills: res.data.user.skills,
            profileImage: res.data.user.profileImage,
            resumeLink: res.data.user.resumeLink,
            experience: res.data.user.experience.map((exp) => ({
              company: exp.company,
              role: exp.role,
              duration: exp.duration,
            })),
            education: res.data.user.education.map((edu) => ({
              institute: edu.institute,
              degree: edu.degree,
              year: edu.year,
            })),
          });
        } else {
          setDetails({
            id: res.data.user._id,
            name: res.data.user.name,
            email: res.data.user.email,
            bio: res.data.user.bio,
            website: res.data.user.website,
            phone: res.data.user.phone,
            location: res.data.user.location,
            company: res.data.user.company,
            about: res.data.user.about,
            profileImage: res.data.user.profileImage,
            logo: res.data.user.logo,
            postedJobs: res.data.user.postedJobs
              ? res.data.user.postedJobs.map((job) => ({
                  title: job.title,
                  category: job.category,
                  location: job.location,
                }))
              : [],
          });
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
  
    fetchUserDetails();
  }, [API_BASE_URL, id]);
  

  useEffect(() => {
    // console.log(details.name); // Now it will log the updated name
  }, [details]); // This will trigger whenever details state changes
  return (
    <div className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Profile</h1>

      <Card className="bg-[#1e1e1e] border border-[#2a2a2a] shadow-lg rounded-2xl max-w-3xl mx-auto">
        <CardContent className="p-6">
          {/* Common Header */}
          <div className="flex items-center gap-6 mb-6">
          {details.profileImage && (
  <img src={details.profileImage} alt="Profile" />
)}

            <div>
              <h2 className="text-2xl font-bold">{details.name}</h2>
              <p className="text-gray-400">{details.email}</p>
              {role === "Recruiter" && (
                <p className="text-purple-300 font-semibold">{details.company}</p>
              )}
            </div>
          </div>

            {/* JobSeeker's view */}
        {role === "JobSeeker" && (
          <>
            <p className="mb-4 text-gray-300">{details.about}</p>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.skills ? (
                  details.skills.map((skill, i) => (
                    <Badge key={i} className="bg-purple-700">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <p>No skills listed</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Experience
              </h3>
              {details.experience ? (
                details.experience.map((exp, i) => (
                  <p key={i}>
                    <span className="font-semibold">{exp.role}</span> at{" "}
                    <span className="text-gray-300">{exp.company}</span> (
                    {exp.duration})
                  </p>
                ))
              ) : (
                <p>No experience listed</p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Education
              </h3>
              {details.education ? (
                details.education.map((edu, i) => (
                  <p key={i}>
                    {edu.degree}, {edu.institute} ({edu.year})
                  </p>
                ))
              ) : (
                <p>No education listed</p>
              )}
            </div>

            <Button
              variant="secondary"
              onClick={() => window.open(details.resumeLink, "_blank")}
            >
              View Resume
            </Button>
          </>
        )}



          {/* Recruiter view */}
          {role === "Recruiter" && (
          <>
            <p className="mb-4 text-gray-300">{details.about}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Company
              </h3>
              <p>{details.company || "No Company provided"}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Website
              </h3>
              <p>{details.website || "No website provided"}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Bio
              </h3>
              <p>{details.bio || "No Bio provided"}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Location
              </h3>
              <p>{details.location || "No address provided"}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-300 mb-2">
                Posted Jobs
              </h3>
              <ul className="space-y-2">
                {details.postedJobs?details.postedJobs.length > 0 ? (
                  details.postedJobs.map((job, i) => (
                    <li key={i} className="border border-[#333] rounded-lg p-3">
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-sm text-gray-400">
                        {job.category} • {job.location}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No jobs posted yet.</p>
                ):[]}
              </ul>
            </div>
          </>
        )}

            <div className="flex gap-4 mt-4">
             <Link to={`/edit-profile/${role}/${id}`}> <Button
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => navigate(`/edit-profile/${role}/${id}`)}
              >
                Edit Profile
              </Button>
              </Link>

              <Button
                variant="destructive"
                onClick={() => handleDeleteAccount()}
              >
                Delete Account
              </Button>
            </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
