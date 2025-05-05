import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ApplicantsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const mockApplicants = [
    {
      id: "101",
      name: "Aman Verma",
      email: "aman@example.com",
      skills: ["React", "JavaScript", "Tailwind"],
      resumeLink: "/dummy-resume-aman.pdf",
    },
    {
      id: "102",
      name: "Priya Sharma",
      email: "priya@example.com",
      skills: ["Node.js", "MongoDB", "Express"],
      resumeLink: "/dummy-resume-priya.pdf",
    },
    {
      id: "103",
      name: "Rohit Kumar",
      email: "rohit@example.com",
      skills: ["UI/UX", "Figma", "Photoshop"],
      resumeLink: "/dummy-resume-rohit.pdf",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Applicants for Job ID: <span className="text-white">{jobId}</span>
      </h1>

      {mockApplicants.map((applicant) => (
        <Card
          key={applicant.id}
          className="bg-[#1e1e1e] border border-[#2a2a2a] mb-6 shadow-md rounded-2xl"
        >
          <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-semibold text-purple-300">
                {applicant.name}
              </h2>
              <p className="text-sm text-amber-100-400">{applicant.email}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {applicant.skills.map((skill, i) => (
                  <Badge key={i} className="bg-purple-700 text-amber-100">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="bg-blue-600 text-white hover:bg-blue-700 text-sm"
                onClick={() => navigate(`/workseeker/${applicant.id}`)}
              >
                View Profile
              </Button>
              <Button
                variant="secondary"
                className="text-sm mt-4"
                onClick={() => window.open(applicant.resumeLink, "_blank")}
              >
                View Resume
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
