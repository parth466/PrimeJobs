// src/pages/EditProfile.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/middleware/AuthContext";

export default function EditProfile() {
  const { role, id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = window.location.protocol === "https:"
  ? "https://primejobs.onrender.com": "http://localhost:3000";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    bio: "",
    profileImage: "",
    skills: "",
    resume: null,
    experience: [{ company: "", role: "", duration: "" }], // workseeker
    education: [{ institute: "", degree: "", year: "" }],  // workseeker
    company: "",   // hirer
    website: "",       // hirer
    companyLogo: "",   // hirer
    postedJobs: [{ title: "", category: "", location: "" }], // hirer
  });

  const handleChange = (e, index, section) => {
    const { name, value, files } = e.target;
    if (section) {
      const updatedSection = [...formData[section]];
      updatedSection[index][name] = value;
      setFormData({ ...formData, [section]: updatedSection });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSectionItem = (section) => {
    const newItem = section === "experience" || section === "education"
      ? { company: "", role: "", duration: "" }
      : { title: "", category: "", location: "" };
    setFormData({
      ...formData,
      [section]: [...formData[section], newItem],
    });
  };

  const removeSectionItem = (section, index) => {
    const updatedSection = [...formData[section]];
    updatedSection.splice(index, 1);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        navigate(`/profile/${role}/${id}`);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="p-6 bg-[#121212] min-h-screen text-white">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Edit Your Profile</h2>
  
      <Card className="bg-[#1e1e1e] border border-[#2e2e2e] max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
  
            {/* Basic Details */}
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
            />
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Bio / About You"
            />
  
            {/* Profile Image */}
            <div>
              <label className="block mb-1 text-sm">Profile Image</label>
              <Input type="file" name="profileImage" onChange={handleChange} />
            </div>


  
            {/* Role-Specific Details */}
            {role === "JobSeeker" && (
              <>
                {/* Skills */}
                <Input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills (comma separated)"
                />
                <div>
                  <label className="block mb-1 text-sm">Upload Resume</label>
                  <Input type="file" name="resume" onChange={handleChange} />
                </div>
  
                {/* Experience Section */}
                <h3 className="text-lg font-semibold">Experience</h3>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleChange(e, index, "experience")}
                      placeholder="Company"
                    />
                    <Input
                      name="role"
                      value={exp.role}
                      onChange={(e) => handleChange(e, index, "experience")}
                      placeholder="Role"
                    />
                    <Input
                      name="duration"
                      value={exp.duration}
                      onChange={(e) => handleChange(e, index, "experience")}
                      placeholder="Duration"
                    />
                    <Button
                      variant="destructive"
                      onClick={() => removeSectionItem("experience", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button onClick={() => addSectionItem("experience")}>
                  Add Experience
                </Button>
  
                {/* Education Section */}
                <h3 className="text-lg font-semibold">Education</h3>
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      name="institute"
                      value={edu.institute}
                      onChange={(e) => handleChange(e, index, "education")}
                      placeholder="Institute"
                    />
                    <Input
                      name="degree"
                      value={edu.degree}
                      onChange={(e) => handleChange(e, index, "education")}
                      placeholder="Degree"
                    />
                    <Input
                      name="year"
                      value={edu.year}
                      onChange={(e) => handleChange(e, index, "education")}
                      placeholder="Year"
                    />
                    <Button
                      variant="destructive"
                      onClick={() => removeSectionItem("education", index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button onClick={() => addSectionItem("education")}>
                  Add Education
                </Button>
              </>
            )}
  
            {role === "Recruiter" && (
              <>
                {/* Company Details */}
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                />
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Website"
                />
                <div>
                  <label className="block mb-1 text-sm">Company Logo</label>
                  <Input type="file" name="companyLogo" onChange={handleChange} />
                </div>
  
               
              </>
            )}
  
            {/* Save Button */}
            <Button type="submit" className="w-full bg-purple-600">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}  