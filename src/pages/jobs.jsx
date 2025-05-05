import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

// Dummy data
const jobsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Job Position ${i + 1}`,
  company: `Company ${i + 1}`,
  location: i % 2 === 0 ? "Remote" : "New York",
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), // recent to old
  image: "https://via.placeholder.com/80",
  category: i % 3 === 0 ? "Frontend" : i % 3 === 1 ? "Backend" : "Design",
}));

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const [category, setCategory] = useState("All");
  
  const skipNextLoad = useRef(false);

  const jobsPerPage = 10;

  useEffect(() => {
    if (page === 1) return; // Page 1 jobs already loaded in initial useEffect
  
    const start = (page - 1) * jobsPerPage;
    const end = page * jobsPerPage;
    const nextJobs = jobsData.slice(start, end);
  
    // Avoid adding duplicate jobs
    setJobs((prev) => {
      const jobIds = new Set(prev.map((job) => job.id));
      const uniqueNewJobs = nextJobs.filter((job) => !jobIds.has(job.id));
      return [...prev, ...uniqueNewJobs];
    });
  }, [page]);
  

  useEffect(() => {
    const start = 0;
    const end = jobsPerPage;
    const initialJobs = jobsData.slice(start, end);
    setJobs(initialJobs);
    setPage(1); // Reset to first page
    skipNextLoad.current = true; // Block next infinite scroll trigger
  }, [search, sort, category]);
  
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          // Skip one load after reset
          if (skipNextLoad.current) {
            skipNextLoad.current = false;
            return;
          }
  
          setLoading(true);
          setTimeout(() => {
            setPage((prev) => prev + 1);
            setLoading(false);
          }, 1000);
        }
      },
      { threshold: 1 }
    );
  
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);
  

  const filteredJobs = jobs
    .filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))
    .filter((job) => (category === "All" ? true : job.category === category))
    .sort((a, b) => {
      if (sort === "latest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sort === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }
      return 0;
    });

  const latestDate = filteredJobs.length
    ? new Date(
        Math.max(...filteredJobs.map((job) => new Date(job.date).getTime()))
      )
    : null;

  return (
    <div className="p-6 text-white min-h-screen bg-[#121212]">
      <h1 className="text-3xl font-bold mb-6 text-purple-300">
        Find Your Dream Job
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 bg-[#1f1f1f] border-none text-white placeholder-gray-400"
        />

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[200px] bg-[#1f1f1f] border-none text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-[#1f1f1f] text-white">
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[200px] bg-[#1f1f1f] border-none text-white">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-[#1f1f1f] text-white">
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => {
          const isLatest = new Date(job.date).getTime() === latestDate?.getTime();

          return (
            <Link to={`/job/${job.id}`} key={job.id}>
              <Card
                key={job.id}
                className="bg-[#1e1e1e] border border-[#2e2e2e] text-white shadow-md hover:shadow-purple-700/40 transition-shadow hover:-translate-y-1 hover:scale-[1.01] duration-300"
              >
                <CardContent className="p-4 flex items-start gap-4">
                  <img
                    src={job.image}
                    alt="Job"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">
                        {job.title}
                      </h2>
                      {isLatest && (
                        <Badge className="bg-purple-600 text-white ml-2">
                          Latest
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-300">{job.company}</p>
                    <p className="text-sm text-gray-400">{job.location}</p>
                    <p className="text-xs text-gray-500 italic mt-2">
                      Posted on: {new Date(job.date).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div ref={loaderRef} className="h-10 mt-6">
        {loading ? (
          <p className="text-center text-sm text-gray-400">
            Loading more jobs...
          </p>
        ) : filteredJobs.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            No more jobs available.
          </p>
        ) : null}
      </div>
    </div>
  );
}
