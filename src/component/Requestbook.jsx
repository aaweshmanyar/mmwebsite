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
          "https://newmmdata-backend.onrender.com/api/printedbook"
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
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      {/* Header */}
      <header className="relative z-50 bg-[#783F1D] text-white">
        {/* Desktop + Mobile Nav */}
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Mobile Menu Button */}
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
              About
            </a>
            <a href="/newsandevent" className="hover:text-amber-300">
              News & Events
            </a>
            <a href="/books" className="hover:text-amber-300">
              Books
            </a>
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 z-30 bg-white rounded-full p-1 shadow-md">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-20 object-contain rounded-full"
            />
          </div>

          {/* Right Nav */}
          <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
            {/* <div className="relative">
                  <input
                    type="text"
                    placeholder="search"
                    className="px-4 py-1 rounded-full bg-[#E7D092] text-sm text-black placeholder:text-gray-700 outline-none"
                  />
                  <span className="absolute right-3 top-1.5 text-black">
                    <Search className="w-4 h-4" />
                  </span>
                </div> */}
            <a href="/article" className="hover:text-amber-300">
              Articles
            </a>
            <a href="/question" className="hover:text-amber-300">
              Question Answer
            </a>
            <a href="/requestbook" className="hover:text-amber-300">
              Request a Book
            </a>
            <a href="/contact" className="hover:text-amber-300">
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Slide-out Menu (from left) */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-1/2 h-full bg-[#783F1D] p-4 space-y-4 text-[15px] font-medium z-50">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <a href="/" className="block hover:text-amber-300">
                Home
              </a>
              <a href="/about" className="block hover:text-amber-300">
                About
              </a>
              <a href="/newsandevent" className="block hover:text-amber-300">
                News & Events
              </a>
              <a href="/books" className="block hover:text-amber-300">
                Books
              </a>
              <a href="/article" className="block hover:text-amber-300">
                Articles
              </a>
              <a href="/question" className="block hover:text-amber-300">
                Question Answer
              </a>
              <a href="/requestbook" className="block hover:text-amber-300">
                Request a Book
              </a>
              <a href="/contact" className="block hover:text-amber-300">
                Contact
              </a>

              {/* Search bar */}
              <div className="flex items-center bg-white rounded-full px-3 py-1 mt-2 w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent outline-none text-black text-sm w-full"
                />
                <Search className="w-4 h-4 text-black ml-2" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Background Layer */}
      {/* <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      /> */}

      {/* Form Section */}
      <div className="relative z-10 w-full py-12 px-4 mt-6 md:px-10">
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
                className="gulzartext w-full mt-1 border border-gray-300 rounded px-3 py-2"
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
