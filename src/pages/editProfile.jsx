// src/pages/EditProfile.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function EditProfile() {
  const { role, id } = useParams();

  // Dummy initial data for simulation
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "Remote",
    bio: "Passionate developer.",
    profileImage: "",
    skills: "React, Node, MongoDB", // workseeker
    resume: null,                  // workseeker
    companyName: "Tech Co",        // hirer
    website: "https://techco.com", // hirer
    companyLogo: "",               // hirer
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add actual backend logic
    console.log("Updated Profile Data:", formData);
    alert("Profile Updated (Mock)");
  };

  return (
    <div className="p-6 bg-[#121212] min-h-screen text-white">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">Edit Your Profile</h2>

      <Card className="bg-[#1e1e1e] border border-[#2e2e2e] max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">

            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" />
            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
            <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio / About You" />

            <div>
              <label className="block mb-1 text-sm">Profile Image</label>
              <Input type="file" name="profileImage" onChange={handleChange} />
            </div>

            {role === "workseeker" && (
              <>
                <Input name="skills" value={formData.skills} onChange={handleChange} placeholder="Skills (comma separated)" />
                <div>
                  <label className="block mb-1 text-sm">Upload Resume</label>
                  <Input type="file" name="resume" onChange={handleChange} />
                </div>
              </>
            )}

            {role === "hirer" && (
              <>
                <Input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Company Name" />
                <Input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
                <div>
                  <label className="block mb-1 text-sm">Company Logo</label>
                  <Input type="file" name="companyLogo" onChange={handleChange} />
                </div>
              </>
            )}

            <Button type="submit" className="w-full bg-purple-600">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
