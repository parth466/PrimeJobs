import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Optional: for toasts

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [recruter, setRecruiter] = useState(false);
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", { email });

      if (res.data.success) {
        localStorage.setItem("email", email);
        toast.success("OTP sent to your email!");
        navigate("/verify-otp");
      } else {
        toast.error(res.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("Failed to send OTP:", err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    recruter ? (
        <>
        <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="../../uploads/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/60 z-10"></div>
  
        {/* Login Form */}
        <div className="relative z-20 flex justify-center items-center h-full">
          <form
            onSubmit={handleSendOTP}
            className="bg-black p-8 rounded-xl shadow-xl backdrop-blur-md w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4"
              placeholder="Enter Email for OTP"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
            <Button onClick={()=> setRecruiter(false)} className="w-full mt-4" variant="outline">
            Login As Workseeker
            </Button>
          </form>
        </div>
      </div>
      </>): (<>
         <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="../../uploads/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/60 z-10"></div>
  
        {/* Login Form */}
        <div className="relative z-20 flex justify-center items-center h-full">
          <form
            onSubmit={handleSendOTP}
            className="bg-black p-8 rounded-xl shadow-xl backdrop-blur-md w-[90%] max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
            <Label className="text-white">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4"
              placeholder="Enter Email for OTP"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
            <Button onClick={()=> setRecruiter(true)}  className="w-full mt-4" variant="outline">
            Login As Recruter
            </Button>
          </form>
        </div>
      </div></>)
   
  );
}
