import { useParams, useNavigate, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const jobsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Job Position ${i + 1}`,
  company: `Company ${i + 1}`,
  location: i % 2 === 0 ? "Remote" : "New York",
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  description: `This is a full description for Job Position ${i + 1}. You’ll be responsible for amazing things.`,
  image: "https://via.placeholder.com/80",
  category: i % 3 === 0 ? "Frontend" : i % 3 === 1 ? "Backend" : "Design",
}));

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = jobsData.find((j) => j.id === parseInt(id));
  const jobId = parseInt(id);

  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [alreadyApplied, setAlreadyApplied] = useState(false);

  useEffect(() => {
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAlreadyApplied(applied.includes(jobId));
  }, [jobId]);

  const markJobAsApplied = (jobId) => {
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    if (!applied.includes(jobId)) {
      applied.push(jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(applied));
    }
  };

  const handleApply = (e) => {
    e.preventDefault();

    // Mock submission
    console.log("Applying for job:", id);
    console.log("Cover Letter:", coverLetter);
    console.log("Resume:", resume);

    setCoverLetter("");
    setResume(null);
    setIsApplying(false);

    markJobAsApplied(jobId);
    setAlreadyApplied(true);

    alert("You have successfully applied for the job!");
    navigate("/saved-jobs");
  };

  if (!job) {
    return (
      <div className="p-6 text-white bg-[#121212] min-h-screen">
        <h2 className="text-2xl text-red-400">Job not found</h2>
        <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="p-6 text-white min-h-screen bg-[#121212]">
      <div className="max-w-3xl mx-auto bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e]">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={job.image}
            alt="Job"
            className="w-24 h-24 object-cover rounded-md"
          />
          <div>
            <h1 className="text-3xl font-bold">Title: {job.title}</h1>
            <h2 className="text-m text-gray-400">Company: {job.company}</h2>
            <h3 className="text-m text-gray-500">Location: {job.location}</h3>
            <Badge className="mt-2">Category: {job.category}</Badge>
          </div>
        </div>

        <p className="text-sm italic text-gray-500 mb-4">
          Posted on: {new Date(job.date).toLocaleDateString()}
        </p>

        <p className="text-base text-gray-300 leading-6">
          About Job:- <br /> {job.description}
        </p>

        {alreadyApplied ? (
          <p className="mt-6 text-green-400 font-semibold">
            ✅ You’ve already applied to this job.
          </p>
        ) : (
          <Button 
            onClick={() => setIsApplying(true)} 
            className="mt-6 text-white bg-purple-600 hover:bg-purple-700"
          >
            Apply Now
          </Button>
        )}

        <Button className="mt-6 ml-130 text-white self-end bg-purple-600 hover:bg-purple-700">
          <Link to="/jobs">Back</Link>  
        </Button>

        {isApplying && !alreadyApplied && (
          <div className="mt-8 bg-[#1e1e1e] p-6 rounded-xl border border-[#2e2e2e]">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Application Form</h3>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <Textarea
                  placeholder="Cover Letter"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full bg-[#1f1f1f] text-white placeholder-gray-400"
                />
              </div>

              <div>
                <Input
                  type="file"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="w-full bg-[#1f1f1f] text-white"
                />
                <p className="text-sm text-gray-400 mt-2">Upload your resume (PDF or DOCX)</p>
              </div>

              <Button type="submit" className="w-full bg-purple-600">
                Submit Application
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
