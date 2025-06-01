import React, { useState } from 'react';
import logo from '../../../public/images/image 2.png';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
      {/* Top White Nav */}
      <div className="relative z-20 bg-white">
<div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-[25px] md:py-3 relative">
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
            <a href="/" className="hover:text-green-700">Home</a>
            <a href="/about" className="hover:text-green-700">About</a>
            <a href="/newsandevent" className="hover:text-green-700">News & Events</a>
            <a href="/books" className="hover:text-green-700">Books</a>
          </nav>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 bg-white rounded-full p-1 shadow-md z-30">
            <img
              src={logo}
              alt="Logo"
              width={70}
              height={70}
              className="rounded-full object-contain"
            />
          </div>

          {/* Right Nav (Desktop) */}
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
            {/* <div className="relative">
              <input
                type="text"
                placeholder="search"
                className="px-4 py-1 rounded-full bg-green-100 text-sm outline-none placeholder:text-gray-600"
              />
              <span className="absolute right-2 top-1.5 text-gray-600">
                🔍
              </span>
            </div> */}
            <a href="/article" className="hover:text-green-700">Articles</a>
            <a href="/question" className="hover:text-green-700">Question Answer</a>
            <a href="/requestbook" className="hover:text-green-700">Request a Book</a>
            <a href="/contact" className="hover:text-green-700">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-gray-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Green Background Strip */}
      {/* <div className="bg-green-200 h-10 md:h-14 relative z-10"></div> */}

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 w-1/2 h-full bg-white p-4 space-y-4 shadow-md">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 absolute top-4 right-4"
              aria-label="Close menu"
            >
              ✕
            </button>
            <a href="/" className="block text-gray-800 hover:text-green-700">Home</a>
            <a href="/about" className="block text-gray-800 hover:text-green-700">About</a>
            <a href="/newsandevent" className="block text-gray-800 hover:text-green-700">News & Events</a>
            <a href="/books" className="block text-gray-800 hover:text-green-700">Books</a>
            <a href="/article" className="block text-gray-800 hover:text-green-700">Articles</a>
            <a href="/question" className="block text-gray-800 hover:text-green-700">Question Answer</a>
            <a href="/requestbook" className="block text-gray-800 hover:text-green-700">Request a Book</a>
            <a href="/contact" className="block text-gray-800 hover:text-green-700">Contact</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
