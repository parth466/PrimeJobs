import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [logo, setLogo] = useState(null); // State to handle the company logo

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    // Handle form submission logic here (mock for now)
    console.log({
      title,
      company,
      location,
      category,
      description,
      jobType,
      logo, // Include the logo in the submission
    });

    // Reset form after submission
    setTitle("");
    setCompany("");
    setLocation("");
    setCategory("Frontend");
    setDescription("");
    setJobType("Full-time");
    setLogo(null); // Reset the logo state
  };

  return (
    <div className="p-6 bg-[#121212] min-h-screen">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        Post a New Job
      </h1>

      <Card className="bg-[#1e1e1e] border border-[#2e2e2e] text-white shadow-md">
        <CardContent className="p-6">
          <form onSubmit={handlePostJob} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Job Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#1f1f1f] text-white placeholder-gray-400"
                />
              </div>
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#1f1f1f] text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-full">
                <Input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#1f1f1f] text-white placeholder-gray-400"
                />
              </div>
              <div className="w-full">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full bg-[#1f1f1f] text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1f1f1f] text-white">
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Textarea
                placeholder="Job Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#1f1f1f] text-white placeholder-gray-400"
              />
            </div>

            <div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger className="w-full bg-[#1f1f1f] text-white">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#1f1f1f] text-white">
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Company Logo Upload */}
            <div className="space-y-2">
              <label className="text-white">Company Logo</label>

              <div>
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <label htmlFor="logo-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#1f1f1f] text-white hover:bg-[#2a2a2a]"
                  >
                    Upload Logo
                  </Button>
                </label>
              </div>

              {logo && (
                <div className="mt-2">
                  <img
                    src={logo}
                    alt="Company Logo Preview"
                    className="w-20 h-20 object-cover rounded-md border border-gray-600"
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="w-full bg-purple-600 text-white">
              Post Job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
