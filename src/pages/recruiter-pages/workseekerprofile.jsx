import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function WorkseekerProfile() {
  const { id } = useParams();

  // Dummy data
  const workseeker = {
    id,
    name: "Aman Verma",
    email: "aman@example.com",
    bio: "Passionate frontend developer with 2 years of experience in React and Tailwind CSS.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind"],
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

  return (
    <div className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Workseeker Profile
      </h1>

      <Card className="bg-[#1e1e1e] border border-[#2a2a2a] shadow-lg rounded-2xl max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center gap-6 mb-6">
            <img
              src={workseeker.profileImage}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-purple-500"
            />
            <div>
              <h2 className="text-2xl font-bold">{workseeker.name}</h2>
              <p className="text-gray-400">{workseeker.email}</p>
            </div>
          </div>

          <p className="mb-4 text-gray-300">{workseeker.bio}</p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {workseeker.skills.map((skill, i) => (
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
            {workseeker.experience.map((exp, i) => (
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
            {workseeker.education.map((edu, i) => (
              <p key={i}>
                {edu.degree}, {edu.institute} ({edu.year})
              </p>
            ))}
          </div>

          <Button
            variant="secondary"
            onClick={() => window.open(workseeker.resumeLink, "_blank")}
          >
            View Resume
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
