import { useState } from "react";
import "./App.css";
import Home from "./pages/home";
import About from "./pages/about";
import { Routes, Route } from "react-router-dom";
import Jobs from "./pages/jobs";
import LoginPage from "./pages/auth-Pages/login";
import Register from "./pages/auth-Pages/register";
import JobDetail from "./pages/job-detail";
import PostJob from "./pages/recruiter-pages/job-posting";
import ApplicantsPage from "./pages/recruiter-pages/applicants";
import MyPostedJobs from "./pages/recruiter-pages/Mypostedjobs";
import WorkseekerProfile from "./pages/recruiter-pages/workseekerprofile";
import UserProfile from "./pages/userProfile";
import EditProfile from "./pages/editProfile";
import SavedJobs from "./pages/savedjobs";
import VerifyOtp from "./pages/auth-Pages/verify-otp";
import { AuthProvider } from "./middleware/AuthContext.jsx";
import ExampleComponent from "./pages/example";
function App() {
  const [count, setCount] = useState(0);

  return (  
    <>

        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/example" element={<ExampleComponent />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/job-posting" element={<PostJob />} />
          <Route path="/applicants/:jobId" element={<ApplicantsPage />} />
          <Route path="/worker-profile/:Id" element={<WorkseekerProfile />} />
          <Route path="/profile/:role/:id" element={<UserProfile />} />
          <Route path="/edit-profile/:role/:id" element={<EditProfile />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/myjobs" element={<MyPostedJobs />} />
          <Route path="/job/:id" element={<JobDetail />} />
        </Routes>
     
    </>
  );
}

export default App;
