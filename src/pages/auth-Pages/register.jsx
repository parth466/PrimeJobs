import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { ModeToggle } from "@/components/ui/ModeToggle";

// import { auth, provider } from "../../utils/firebase";
// import { signInWithPopup } from "firebase/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Recruiter,setRecruiter] = useState(false);
  const navigate = useNavigate();
  const [savedjobs, setSavedJobs] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const role = Recruiter ? "Recruiter" : "JobSeeker";
  
      console.log("📤 Sending data:", {
        name,
        email,
        password,
        role,
      });
      const API_BASE_URL = import.meta.env.VITE_API_URL ;
      console.log("API_BASE_URL:", API_BASE_URL); // Debug log
      // Then use it like:
  //  || "http://localhost:3000"
      
      const res = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to register. Status: " + res.status);
      }
  
      const data = await res.json();
  
      if (data.message) {
        navigate("/login");
      } else {
        alert(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("🚫 Registration error:", error);
      alert("Error during registration. Please try again.");
    }
  };
  


  return (
    <>
      {/* Background Video Section */}
      <div className="relative flex min-h-screen w-full items-center justify-center p-6 md:p-10">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="./uploads/bgr1.mp4" type="video/mp4" />
        </video>

        {/* Overlay to Improve Readability */}
        <div className="absolute inset-0  bg-opacity-50"></div>

        {/* Registration Form */}
        <div className="relative  w-full max-w-sm  p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Register</CardTitle>
            <CardDescription>
              Fill out the form below to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full mt-5 mb-5">
                  Register
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  
                >
                  Login with Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
            <div className="grid gap-2">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            value={Recruiter ? "Recruiter" : "JobSeeker"}
            onChange={(e) => setRecruiter(e.target.value === "Recruiter")}
            className="p-2 border rounded"
          >
            <option value="JobSeeker">Job Seeker</option>
            <option value="Recruiter">Recruiter</option>
          </select>
        </div>

          </CardContent>
        </div>
      </div>
    </>
  );
};

export default Register;
