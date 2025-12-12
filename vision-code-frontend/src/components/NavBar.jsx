import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ children, appName }) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <span className="text-xl font-bold gradient-text">{appName}</span>
            </NavLink>

            <div className="hidden md:flex space-x-6">{children}</div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/login"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
