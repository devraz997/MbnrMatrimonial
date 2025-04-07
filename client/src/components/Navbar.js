import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            MBNR Matrimonial
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-gray-700 hover:text-pink-600">Home</Link>
            <Link to="/search" className="px-3 py-2 text-gray-700 hover:text-pink-600">Search</Link>
            <Link to="/agents" className="px-3 py-2 text-gray-700 hover:text-pink-600">Agents</Link>
            <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-pink-600">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700">Register</Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 py-2 space-y-2">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Home</Link>
            <Link to="/search" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Search</Link>
            <Link to="/agents" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Agents</Link>
            <Link to="/become-agent" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Become an Agent</Link>
            <Link to="/verification" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Get Verified</Link>
            <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Login</Link>
            <Link to="/register" className="block px-3 py-2 text-gray-700 hover:text-pink-600">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
