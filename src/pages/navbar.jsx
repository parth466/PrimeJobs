import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Aperture, Menu, X } from "lucide-react";
import { useAuth } from "@/middleware/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useAuth();
  const isRecruiter = user?.role === "Recruiter";
  const isWorkseeker = user?.role === "JobSeeker";
  const id = user?.id;
  const role = user?.role;
  let navitems = [];
  if (isRecruiter) {
    navitems = [
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: "Post Job", path: "/job-posting" },
      { name: "My Jobs", path: "/myjobs" },
      { name: "Applicants", path: `/applicants/${user.id}` },
      { name: "About", path: "/about" },
      { name: "Profile", path: `/profile/${user.role}/${user.id}` },
    ];
  } else if (isWorkseeker) {
    navitems = [
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: "About", path: "/about" },
      { name: "Profile", path: `/profile/${user.role}/${user.id}` },
    ];
  } else {
    navitems = [
      { name: "Home", path: "/" },
      { name: "Jobs", path: "/jobs" },
      { name: "About", path: "/about" },
    ];
  }

  return (
    <nav className="relative z-30 p-4 bg-background/50 sticky top-0 backdrop-blur-xs border-b">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex text-lg font-bold gap-2 items-center">
            <Aperture /> Prime Jobs
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="hover:scale-105 hover:font-semibold transition-transform duration-300"
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="hover:scale-105 hover:font-semibold transition-transform duration-300"
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="hover:scale-105 hover:font-semibold transition-transform duration-300"
          >
            About
          </Link>
          <div className="flex items-center space-x-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline">SignUp</Button>
            </Link>
            {user && (
              <Link to={`/profile/${user.role}/${user.id}`}>Profile</Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay Dropdown) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-background/90 backdrop-blur-md border-b transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block hover:font-semibold transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="block hover:font-semibold transition"
            onClick={() => setMenuOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/about"
            className="block hover:font-semibold transition"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>
            <Button variant="outline" className="w-full">
              Login
            </Button>
          </Link>
          <Link to="/register" onClick={() => setMenuOpen(false)}>
            <Button variant="outline" className="w-full">
              SignUp
            </Button>
          </Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
