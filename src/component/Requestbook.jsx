import bg from "../../public/images/bg.png";
import Logo from "../../public/images/marclogo.png";
import React, { useState, useEffect } from "react";
import { Check, Menu, X, Search } from "lucide-react";
import QrCode from "../../public/images/fake-qr.jpg";

const Requestbook = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [book, setBook] = useState([]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/books"
        );
        const booksData = await booksRes.json();
        setBook(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f8efd0] relative overflow-hidden">
      {/* Header */}
      <header className="bg-[#783F1D] text-white relative z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Left Nav */}
          <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
            <a href="/" className="hover:text-amber-300">
              Home
            </a>
            <a href="/about" className="hover:text-amber-300">
              About Center
            </a>
            <span className="hover:text-amber-300 cursor-pointer">Books</span>
          </nav>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 md:w-20 object-contain"
            />
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
            <a href="/article" className="hover:text-amber-300">
              Articles
            </a>
            <a href="/requestbook" className="hover:text-amber-300">
              Request Book
            </a>
            <a href="/question" className="hover:text-amber-300">
              Question
            </a>
            <a href="/contact" className="hover:text-amber-300">
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#783F1D] px-4 pb-5 space-y-4 text-[15px] font-medium z-10">
            <a href="/" className="block hover:text-amber-300">
              Home
            </a>
            <a href="/about" className="block hover:text-amber-300">
              About Center
            </a>
            <span className="block hover:text-amber-300 cursor-pointer">
              Books
            </span>
            <a href="/article" className="block hover:text-amber-300">
              Articles
            </a>
            <a href="/question" className="block hover:text-amber-300">
              Question
            </a>
            <a href="/contact" className="block hover:text-amber-300">
              Contact
            </a>
            <div className="flex items-center bg-white rounded-full px-3 py-1 mt-2 w-full">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black text-sm w-full"
              />
              <Search className="w-4 h-4 text-black ml-2" />
            </div>
          </div>
        )}
      </header>

      {/* Background Layer */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Form Section */}
      <div className="relative z-10 w-full py-12 px-4 md:px-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h1 className="text-[#783F1D] text-2xl sm:text-3xl font-bold text-center mb-6">
            Request a Book
          </h1>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Your name"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                />
                {isValidEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                placeholder="Your phone number"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Full Address{" "}
                <span className="text-xs text-gray-500">
                  (each street provided)
                </span>
              </label>
              <textarea
                id="address"
                placeholder="Write Full Address"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 min-h-[80px]"
              />
            </div>

            <div>
              <label
                htmlFor="books"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Select Book's
              </label>
              <select
                id="books"
                className="w-full mt-1 border border-gray-300 rounded px-3 py-2"
              >
                <option value="" disabled selected>
                  Select Books
                </option>
                {book.length > 0 ? (
                  book.map((b) => (
                    <option key={b._id} value={b.title}>
                      {b.title}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading books...</option>
                )}
              </select>
            </div>

            <div className="pt-4 text-center">
              <h3 className="text-sm font-medium text-[#6b3c1a]">Donate</h3>
              <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
                If you wish to support our efforts in providing books to those
                in need, scan the QR code to donate.
              </p>
              <div className="flex justify-center mt-4">
                <img
                  src={QrCode}
                  alt="Donation QR Code"
                  className="w-28 h-28 object-contain"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6b3c1a] hover:bg-[#5a3315] text-white rounded px-4 py-2 mt-6 transition duration-300"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Requestbook;
