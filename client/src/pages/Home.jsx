import React from 'react';
import { Brain, Cpu, Code } from 'lucide-react'; // Importing icons from lucide-react

// Main App component for the portfolio page
export default function App() {
  return (
    // Main container for the entire page, centered and with a light gray background
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-10 font-sans">
      {/* Card-like container for the portfolio content */}
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 max-w-6xl w-full flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">

        {/* Left Section: Image with a subtle orange ring */}
        {/* This section is designed to be on the left for larger screens (md and up) */}
        <div className="relative flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center
                    ring-4 ring-orange-300 ring-offset-4 ring-offset-gray-100"> {/* Added a subtle orange ring around the image container */}

          {/* The actual image, positioned within its container */}
          <img
            // Placeholder image URL. You can replace this with your actual photo URL.
            // Using placehold.co for a customizable placeholder.
             src="https://res.cloudinary.com/dqdhui9bw/image/upload/v1753026093/WhatsApp_Image_2025-07-20_at_21.11.04_w8gps4.jpg"
            alt="GORREMUTCHU MANU SAVIOUR BABU"
            // Styling for the image: responsive width/height, object-fit, rounded, border, shadow
            className="relative z-10 w-full h-full object-cover rounded-full border-4 border-white shadow-md"
            // Fallback for image loading errors
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/CCCCCC/000000?text=Image+Error" }}
          />
        </div>

        {/* Right Section: Content (Name, Description, Interests) */}
        {/* This section takes up remaining space and is text-aligned based on screen size */}
        <div className="flex-grow text-center md:text-left">
          {/* Main heading with your name, responsive font size */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Hi, I'm <span className="text-orange-600">GORREMUTCHU MANU SAVIOUR BABU</span>
          </h1>
          {/* Welcome message */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-6">
            Welcome to my portfolio!
          </p>

          {/* Self-description paragraph */}
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-8 max-w-prose mx-auto md:mx-0 leading-relaxed">
            I am a passionate and driven individual with a keen interest in the exciting fields of{' '}
            <span className="font-semibold text-orange-600">Data Science</span>,{' '}
            <span className="font-semibold text-orange-600">Machine Learning</span>, and{' '}
            <span className="font-semibold text-orange-600">Full Stack Development</span>. I love building innovative solutions and exploring new technologies to solve complex problems. My goal is to leverage my skills to create impactful applications and contribute to cutting-edge projects. I am constantly learning and eager to take on new challenges.
          </p>

          {/* Section for Areas of Interest */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Areas of Interest
          </h2>
          {/* Container for interest tags, using flexbox for responsive layout */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6">
            {/* Individual interest tags with icons and styling */}
            <span className="flex items-center bg-orange-100 text-gray-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm transition-transform duration-200 hover:scale-105">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-800" /> Data Science
            </span>
            <span className="flex items-center bg-orange-100 text-gray-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm transition-transform duration-200 hover:scale-105">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-800" /> Machine Learning
            </span>
            <span className="flex items-center bg-orange-100 text-gray-800 px-4 py-2 rounded-full text-sm sm:text-base font-medium shadow-sm transition-transform duration-200 hover:scale-105">
              <Code className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-orange-800" /> Full Stack Development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
