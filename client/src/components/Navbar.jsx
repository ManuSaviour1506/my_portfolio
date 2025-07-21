import React, { useState } from 'react';
// Re-introducing Menu icon from lucide-react for the mobile menu button
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the mobile menu's open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define common styling for nav links to reduce repetition
  const navLinkClasses = `
    px-4 py-2 rounded-lg text-lg font-medium
    transition-colors duration-300 ease-in-out
    hover:bg-white hover:text-orange-600 // Adjusted hover colors for better contrast with orange gradient
    focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75
    text-center w-full sm:w-auto
  `;

  return (
    // Main navigation container
    // CHANGED: bg-[#FF7F50] to bg-gradient-to-r from-orange-400 to-red-500
    <nav className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
      {/* Portfolio title - using Link for consistent navigation */}
      <Link to="/" className="text-3xl sm:text-4xl lg:text-5xl font-bold cursor-pointer ml-4">
        My Portfolio
      </Link>

      {/* Hamburger menu icon for mobile (hidden on sm and larger screens) */}
      <div className="sm:hidden mr-4">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white" // Changed focus ring color to white
          aria-label="Toggle navigation menu"
        >
          {/* Conditionally render Menu or X icon based on menu state */}
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Navigation links container */}
      <div
        className={`
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          sm:translate-x-0
          fixed top-0 right-0 w-64 h-full bg-gradient-to-b from-orange-400 to-red-500 flex flex-col items-center justify-center // Changed mobile menu background to gradient
          space-y-6 p-6 shadow-xl
          transform transition-transform duration-300 ease-in-out
          sm:relative sm:flex sm:flex-row sm:h-auto sm:w-auto sm:bg-transparent sm:space-y-0 sm:space-x-4 sm:p-0 sm:shadow-none
          sm:mr-4
        `}
      >
        {/* Close button for mobile menu (only visible when menu is open on mobile) */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white sm:hidden" // Changed focus ring color to white
          aria-label="Close navigation menu"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation Links - Using Link component from react-router-dom */}
        <Link to="/" className={navLinkClasses} onClick={toggleMenu}>
          Home
        </Link>

        <Link to="/skills" className={navLinkClasses} onClick={toggleMenu}>
          Skills
        </Link>

        <Link to="/projects" className={navLinkClasses} onClick={toggleMenu}>
          Projects
        </Link>

        <Link to="/certifications" className={navLinkClasses} onClick={toggleMenu}>
          Certifications
        </Link>

        <Link to="/contact" className={navLinkClasses} onClick={toggleMenu}>
          Contact
        </Link>
      </div>
    </nav>
  );
}