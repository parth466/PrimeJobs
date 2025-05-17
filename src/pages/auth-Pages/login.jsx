import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Optional: for toasts
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [recruter, setRecruiter] = useState(false);
  const [inputOtp, setInputOtp] = useState(false);
  const [value, setValue] = useState("");
  const API_BASE_URL = window.location.protocol === "https:"
  ? "https://primejobs.onrender.com"
  : "http://localhost:3000";
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("API_BASE_URL:", API_BASE_URL); // Debug log
      const res = await axios.post(`${API_BASE_URL}/api/user/otp`, { email });

      if (res.data.success) {
        localStorage.setItem("email", email);
        toast.success("OTP sent to your email!");
        setInputOtp(true);
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
const handleVerifyOTP = async (e) => {
   e.preventDefault();
   setLoading(true);
   try{
      const res = await axios.post(`${API_BASE_URL}/api/user/login`, {
         email: localStorage.getItem("email"),
         otp: value,
      });
      if (res.data.success) {
         toast.success("OTP verified successfully!");
        
         localStorage.setItem('jwt', res.data.token); // Store the token here
         navigate("/");
      } else {
         toast.error(res.data.message || "Failed to verify OTP.");
      }
   }
   catch(error){
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP.");
   }
    finally{
      setLoading(false);
    }
}
return (
  <>
    <div className="relative w-full min-h-screen overflow-hidden">
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
      <div className="relative z-20 flex justify-center items-center min-h-screen px-4">
        <form
          onSubmit={handleSendOTP}
          className="bg-black p-6 sm:p-8 rounded-xl shadow-xl backdrop-blur-md w-full max-w-md"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white">
            Login
          </h2>
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
            {loading ? "Sending OTP..." : "OTP Sent"}
          </Button>

          {inputOtp && (
            <>
              <div className="space-y-2 mt-4">
                <div className="flex justify-center gap-2">
                <InputOTP 
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className={"flex  gap-2"}>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                </div>
                
                <div className="text-center text-sm text-white">
                  {value === "" ? (
                    <>Enter your one-time password.</>
                  ) : (
                    <>You entered: {value}</>
                  )}
                </div>
              </div>
              <Button
                onClick={handleVerifyOTP}
                className="w-full mt-4"
                disabled={loading}
              >
                Verify OTP
              </Button>
            </>
          )}
        </form>
      </div>
    </div>
  </>
);
}
