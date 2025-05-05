import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UserProfile() {
  const { role, id } = useParams();
  localStorage.setItem("role", role);
    localStorage.setItem("userId", id);
  const loggedInUserId = localStorage.getItem("userId");
  const loggedInUserRole = localStorage.getItem("role");

  const isOwnProfile = loggedInUserId === id && loggedInUserRole === role;

  // Mock data
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

  const data = role === "workseeker" ? workseeker : hirer;

  return (
    <div className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Profile</h1>

      <Card className="bg-[#1e1e1e] border border-[#2a2a2a] shadow-lg rounded-2xl max-w-3xl mx-auto">
        <CardContent className="p-6">
          {/* Common Header */}
          <div className="flex items-center gap-6 mb-6">
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-purple-500"
            />
            <div>
              <h2 className="text-2xl font-bold">{data.name}</h2>
              <p className="text-gray-400">{data.email}</p>
              {role === "hirer" && (
                <p className="text-purple-300 font-semibold">{data.company}</p>
              )}
            </div>
          </div>

          {/* Workseeker view */}
          {role === "workseeker" && (
            <>
              <p className="mb-4 text-gray-300">{data.bio}</p>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, i) => (
                    <Badge key={i} className="bg-purple-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Experience
                </h3>
                {data.experience.map((exp, i) => (
                  <p key={i}>
                    <span className="font-semibold">{exp.role}</span> at{" "}
                    <span className="text-gray-300">{exp.company}</span> (
                    {exp.duration})
                  </p>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Education
                </h3>
                {data.education.map((edu, i) => (
                  <p key={i}>
                    {edu.degree}, {edu.institute} ({edu.year})
                  </p>
                ))}
              </div>

              <Button
                variant="secondary"
                onClick={() => window.open(data.resumeLink, "_blank")}
              >
                View Resume
              </Button>
            </>
          )}

          {/* Hirer view */}
          {role === "hirer" && (
            <>
              <p className="mb-4 text-gray-300">{data.about}</p>

              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">
                  Posted Jobs
                </h3>
                <ul className="space-y-2">
                  {data.postedJobs.map((job, i) => (
                    <li key={i} className="border border-[#333] rounded-lg p-3">
                      <p className="font-semibold">{job.title}</p>
                      <p className="text-sm text-gray-400">
                        {job.category} • {job.location}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          {isOwnProfile && (
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
