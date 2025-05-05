// src/pages/SavedJobs.jsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const savedJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechieSpark",
    location: "Remote",
    logo: "https://via.placeholder.com/50",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "DesignHive",
    location: "Mumbai",
    logo: "https://via.placeholder.com/50",
  },
];
const handleRemove = (id) => {
  setSavedJobs((prev) => prev.filter((job) => job.id !== id));
};

export default function SavedJobs() {
  const navigate = useNavigate();

  return (
    <div className="p-6 min-h-screen bg-[#121212] text-white">
      <h2 className="text-3xl font-bold text-purple-400 mb-6">Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <p className="text-gray-400">You haven’t saved any jobs yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
            <Card
              key={job.id}
              className="bg-[#1e1e1e] border border-[#2e2e2e] hover:shadow-lg transition duration-200"
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-400">
                      {job.company} — {job.location}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => navigate(`/job/${job.id}`)} // Update with correct job detail route
                  className="bg-purple-600"
                >
                  View Job
                </Button>
                <Button
                  variant={"outline"}
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white ml-2"
                  onClick={() => handleRemove(job.id)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
