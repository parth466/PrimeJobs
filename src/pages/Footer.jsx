import React from 'react';
// src/components/Footer.jsx
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20 rounded-t-2xl shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Prime Jobs</h1>
          <p className="text-sm">Find your dream job or the perfect candidate with ease.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white mb-1">Quick Links</h2>
          <a href="/" className="hover:text-white transition duration-200">Home</a>
          <a href="/about" className="hover:text-white transition duration-200">About</a>
          <a href="/contact" className="hover:text-white transition duration-200">Contact</a>
          <a href="/jobs" className="hover:text-white transition duration-200">Jobs</a>
        </div>

        {/* Socials */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition duration-200"><FaGithub size={24} /></a>
            <a href="#" className="hover:text-white transition duration-200"><FaLinkedin size={24} /></a>
            <a href="#" className="hover:text-white transition duration-200"><FaTwitter size={24} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Prime Jobs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

