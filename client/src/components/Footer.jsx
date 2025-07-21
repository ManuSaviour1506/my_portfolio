import React from 'react';
import { Heart, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-10 sm:py-12 mt-16 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-6">

          {/* Company Name/Brand */}
          <div className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md">
            StackZy
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-8 mb-4">
            <a
              href="https://github.com/yourusername" // Replace with your GitHub URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-100 transition-all duration-300 transform hover:scale-125 hover:rotate-6"
              aria-label="GitHub Profile"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://instagram.com/manu_.__15" // Replace with your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-pink-100 transition-all duration-300 transform hover:scale-125 hover:-rotate-6"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-8 h-8" />
            </a>
            <a
              href="mailto:manusaviour5@gmail.com" // Replace with your email address
              className="text-white hover:text-blue-100 transition-all duration-300 transform hover:scale-125 hover:translate-y-1"
              aria-label="Send an Email"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>

         

          {/* Copyright information */}
          <div className="text-center text-sm sm:text-base font-medium text-white opacity-80 pt-2 border-t border-white border-opacity-30 w-full max-w-md">
            &copy; {new Date().getFullYear()} StackZy. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;