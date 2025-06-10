import React, { useState } from "react";
import logo from "../../../public/images/image 2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
  {/* Top Navigation */}
  <div className="relative z-20 bg-white">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:py-3 sm:py-2 relative">
      
      {/* Left Nav (Desktop) */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/newsandevent", label: "News & Events" },
          { href: "/books", label: "Books" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className=" hover:text-green-800 px-2 py-1 "
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Center Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 bg-white rounded-full p-1 shadow-md z-30">
        <img
          src={logo}
          alt="Logo"
          width={64}
          height={64}
          className="rounded-full object-contain"
        />
      </div>

      {/* Right Nav (Desktop) */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
        {[
          { href: "/article", label: "Articles" },
          { href: "/question", label: "Question Answer" },
          { href: "/requestbook", label: "Request a Book" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className=" hover:text-green-800 px-2 py-1 "
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(true)}
          className="text-gray-800 focus:outline-none"
          aria-label="Open menu"
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

  {/* Mobile Drawer Menu */}
  {menuOpen && (
    <div className="fixed inset-0 z-40 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-3/4 max-w-xs bg-white shadow-lg p-6 space-y-4 z-50">
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 text-gray-700"
          aria-label="Close menu"
        >
          ✕
        </button>
        {[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/newsandevent", label: "News & Events" },
          { href: "/books", label: "Books" },
          { href: "/article", label: "Articles" },
          { href: "/question", label: "Question Answer" },
          { href: "/requestbook", label: "Request a Book" },
          { href: "/contact", label: "Contact" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block text-gray-800 hover:bg-green-800 hover:text-white px-2 py-2 rounded transition-colors duration-200"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )}
</header>

  );
};

export default Navbar;
