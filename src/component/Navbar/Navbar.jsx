import React, { useState } from "react";
import logo from "../../../public/images/image 2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // <header className="sticky top-0 z-50 bg-white border-b border-green-100 shadow-sm">
    //   {/* Top Navigation */}
    //   <div className="relative z-20 bg-white">
    //     <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:py-3 sm:py-2 relative">
    //       {/* Left Nav (Desktop) */}
    //       <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
    //         {[
    //           { href: "/", label: "Home" },
    //           { href: "/about", label: "About" },
    //           { href: "/newsandevent", label: "News & Events" },
    //           { href: "/books", label: "Books" },
    //         ].map((item) => (
    //           <a
    //             key={item.href}
    //             href={item.href}
    //             className=" hover:text-green-800 px-2 py-1 "
    //           >
    //             {item.label}
    //           </a>
    //         ))}
    //       </nav>

    //       {/* Center Logo */}
    //       <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 bg-white rounded-full p-1 shadow-md z-30">
    //         <img
    //           src={logo}
    //           alt="Logo"
    //           width={64}
    //           height={64}
    //           className="rounded-full object-contain"
    //         />
    //       </div>

    //       {/* Right Nav (Desktop) */}
    //       <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
    //         {[
    //           { href: "/article", label: "Articles" },
    //           { href: "/question", label: "Question Answer" },
    //           { href: "/requestbook", label: "Request a Book" },
    //           { href: "/contact", label: "Contact" },
    //         ].map((item) => (
    //           <a
    //             key={item.href}
    //             href={item.href}
    //             className=" hover:text-green-800 px-2 py-1 "
    //           >
    //             {item.label}
    //           </a>
    //         ))}
    //       </nav>

    //       {/* Mobile Menu Button */}
    //       <div className="md:hidden">
    //         <button
    //           onClick={() => setMenuOpen(true)}
    //           className="text-gray-800 focus:outline-none"
    //           aria-label="Open menu"
    //         >
    //           <svg
    //             xmlns="http://www.w3.org/2000/svg"
    //             className="w-6 h-6"
    //             fill="none"
    //             viewBox="0 0 24 24"
    //             stroke="currentColor"
    //           >
    //             <path
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth={2}
    //               d="M4 6h16M4 12h16M4 18h16"
    //             />
    //           </svg>
    //         </button>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Mobile Drawer Menu */}
    //   {menuOpen && (
    //     <div className="fixed inset-0 z-40 flex">
    //       {/* Backdrop */}
    //       <div
    //         className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm"
    //         onClick={() => setMenuOpen(false)}
    //       ></div>

    //       {/* Drawer */}
    //       <div className="relative w-3/4 max-w-xs bg-white shadow-lg p-6 space-y-4 z-50">
    //         <button
    //           onClick={() => setMenuOpen(false)}
    //           className="absolute top-4 right-4 text-gray-700"
    //           aria-label="Close menu"
    //         >
    //           ✕
    //         </button>
    //         {[
    //           { href: "/", label: "Home" },
    //           { href: "/about", label: "About" },
    //           { href: "/newsandevent", label: "News & Events" },
    //           { href: "/books", label: "Books" },
    //           { href: "/article", label: "Articles" },
    //           { href: "/question", label: "Question Answer" },
    //           { href: "/requestbook", label: "Request a Book" },
    //           { href: "/contact", label: "Contact" },
    //         ].map((item) => (
    //           <a
    //             key={item.href}
    //             href={item.href}
    //             className="block text-gray-800 hover:bg-green-800 hover:text-white px-2 py-2 rounded transition-colors duration-200"
    //           >
    //             {item.label}
    //           </a>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </header>

     <header className="bg-white sticky  top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <nav className="hidden md:flex gap-6 text-md font-semibold text-gray-700 tracking-wide">
              <a href="/" className="hover:text-green-800">
                Home
              </a>
              <a href="/about" className="hover:text-green-800">
                About
              </a>
              <a href="/newsandevent" className="hover:text-green-800">
                News & Event
              </a>
              <a href="/books" className="hover:text-green-800">
                Books
              </a>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>

            <nav className="hidden md:flex gap-6 text-md font-semibold text-gray-700 tracking-wide">
              <a href="/article" className="hover:text-green-800">
                Articles
              </a>
              <a href="/question" className="hover:text-green-800">
                Question Answer
              </a>
              <a href="/requestbook" className="hover:text-green-800">
                Request a Book
              </a>
              <a href="/contact" className="hover:text-green-800">
                Contact
              </a>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      menuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white bg-[#5a7544] rounded-b-xl">
              <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Home
              </a>
              <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                About
              </a>
              <a
                href="/books"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Books
              </a>
              <a href="/newsandevent" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                News & Event
              </a>
              <a
                href="/article"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Articles
              </a>
              <a
                href="/question"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Question Answer
              </a>
              <a
                href="/requestbook"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Request a Book
              </a>
              <a
                href="/contact"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Navbar;
