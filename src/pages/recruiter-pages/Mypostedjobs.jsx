import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MyPostedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const dummyJobs = [
      {
        _id: "1",
        title: "Frontend Developer",
        company: "TechNova",
        location: "Remote",
        category: "Frontend",
        jobType: "Full-time",
        logo: "https://logo.clearbit.com/vercel.com",
      },
      {
        _id: "2",
        title: "Backend Engineer",
        company: "Cloudify",
        location: "Bangalore",
        category: "Backend",
        jobType: "Part-time",
        logo: "https://logo.clearbit.com/stripe.com",
      },
      {
        _id: "3",
        title: "UI/UX Designer",
        company: "PixelPerfect",
        location: "Delhi",
        category: "Design",
        jobType: "Internship",
        logo: "https://logo.clearbit.com/figma.com",
      },
    ];

    setTimeout(() => {
      setJobs(dummyJobs);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-[#121212] text-white">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">
        Your Posted Jobs
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading your jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-400">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Card
              key={job._id}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                  {/* Logo + Info */}
                  <div className="flex items-start gap-4 w-full">
                    <img
                      src={job.logo}
                      alt={`${job.company} Logo`}
                      className="w-14 h-14 rounded-full object-contain border border-gray-600"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-purple-300">
                        {job.title}
                      </h2>
                      <p className="text-sm text-gray-400 mt-1">
                        {job.company} • {job.location}
                      </p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <Badge className="bg-purple-700">{job.category}</Badge>
                        <Badge variant="outline">{job.jobType}</Badge>
                      </div>
                    </div>
                  </div>
         
                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      className="text-sm mt-4"
                      onClick={() => {
                        const confirmDelete = confirm(
                          "Are you sure you want to delete this job?"
                        );
                        if (confirmDelete) {
                          // Just remove from UI for now
                          setJobs(jobs.filter((j) => j._id !== job._id));
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  {/* Button */}
                  <div className="self-start">
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => navigate(`/applicants/${job._id}`)}
                    >
                      View Applicants
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
