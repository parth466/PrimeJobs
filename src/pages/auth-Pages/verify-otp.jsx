import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [resendStatus, setResendStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email,
        otp,
      });

      if (res.data.success) {
        navigate("/");
      } else {
        setErrorMsg(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    setResendStatus("Sending...");
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", { email });
      if (res.data.success) {
        setResendStatus("OTP Resent!");
      } else {
        setResendStatus("Failed to resend OTP.");
      }
    } catch (err) {
      setResendStatus("Error sending OTP.");
    }
    setTimeout(() => setResendStatus(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

        <div className="mb-4">
          <Label htmlFor="otp">OTP</Label>
          <Input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}
        {resendStatus && <p className="text-blue-500 text-sm mb-4">{resendStatus}</p>}

        <Button type="submit" className="w-full mb-2" disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleResendOTP}
          className="w-full"
        >
          Resend OTP
        </Button>
      </form>
    </div>
  );
};

export default VerifyOtp;
// PCzpfyPq77wHP1RX