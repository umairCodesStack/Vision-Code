import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar({ appName, children, authButtons }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Left side - Logo and Desktop Nav Links */}
          <div className="flex items-center space-x-4 md:space-x-8 min-w-0">
            <NavLink to="/" className="flex items-center flex-shrink-0">
              {/* Logo Component - Responsive sizes */}
              <div className="block lg:hidden">
                <Logo size="small" showText={false} />
              </div>
              <div className="hidden lg:block xl:hidden">
                <Logo size="medium" showText={true} showSubtitle={false} />
              </div>
              <div className="hidden xl:block">
                <Logo size="medium" showText={true} showSubtitle={false} />
              </div>
            </NavLink>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-4 xl:space-x-6">
              {children}
            </div>
          </div>

          {/* Right side - Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-shrink-0">
            {/* Auth Buttons - Responsive */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
              {React.Children.map(authButtons, (button, index) => {
                if (!button) return null;

                return React.cloneElement(button, {
                  key: index,
                  className: `${button.props.className} text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 whitespace-nowrap`,
                });
              })}
            </div>

            {/* Mobile Menu Toggle Button */}
            {children && (
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover: bg-gray-100 transition flex-shrink-0 ml-1"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-5 h-5 sm: w-6 sm:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Navigation Links */}
      {isMobileMenuOpen && children && (
        <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg animate-slideDown">
          <div className="px-3 sm:px-4 py-2 sm:py-3 space-y-1 max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Mobile Navigation Links */}
            {React.Children.map(children, (child, index) => {
              if (!child) return null;

              return (
                <div
                  key={index}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  {React.cloneElement(child, {
                    className: `block w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition text-sm sm:text-base font-medium`,
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        . animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}
